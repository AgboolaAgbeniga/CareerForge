import json
from pydantic import BaseModel, Field
from shared.agent_tools import ToolRegistry
from shared.db import fetch_one
from shared.nvidia_client import nvidia_client

registry = ToolRegistry()

class ConductChatScreenArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")
    conversation_history: list = Field(default=[], description="List of previous message objects (role, content)")

@registry.register(
    name="conduct_technical_chat_screen",
    description="A specialized conversational agent loop that asks technical questions and dynamic follow-ups based on real-time chat responses.",
    args_schema=ConductChatScreenArgs
)
async def conduct_technical_chat_screen(candidate_id: str, job_id: str, conversation_history: list) -> str:
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    job_query = "SELECT title, requirements FROM jobs WHERE id = %s"
    job_res = await fetch_one(job_query, job_id)
    
    if not cand_res or not job_res:
        return "System Error: Cannot load candidate or job context."

    system_prompt = f"""
    You are an expert technical interviewer for the '{job_res['title']}' role.
    Your goal is to assess the candidate's true depth of knowledge regarding: {job_res['requirements']}.
    The candidate claims these skills on their resume: {cand_res['parsed_data']}
    
    Review the conversation history. If the candidate just answered a question, probe deeper into their answer to ensure they aren't just reciting definitions.
    If it is the start of the interview, introduce yourself and ask the first technical question.
    Keep your response to a single, focused question or follow-up. Do not break character.
    """
    
    # We serialize the conversation history into the prompt for the stateless LLM call
    history_str = "\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in conversation_history])
    
    prompt = f"""
    Conversation so far:
    {history_str}
    
    Respond with the next thing the Interviewer should say:
    """
    
    response = await nvidia_client.generate(prompt=prompt, system_prompt=system_prompt, temperature=0.6)
    return response

class GradeAssessmentResponseArgs(BaseModel):
    response_text: str = Field(..., description="The candidate's answer to a technical question")
    expected_concepts: list = Field(..., description="List of technical concepts or keywords expected in a good answer")

@registry.register(
    name="grade_assessment_response",
    description="Evaluates a candidate's answer for conceptual accuracy and problem-solving approach, not just keywords.",
    args_schema=GradeAssessmentResponseArgs
)
async def grade_assessment_response(response_text: str, expected_concepts: list) -> str:
    prompt = f"""
    Evaluate the candidate's answer.
    
    Candidate Answer: "{response_text}"
    Expected Concepts: {expected_concepts}
    
    Grade this answer strictly on a scale of 0-100 based on conceptual accuracy and depth. 
    Return a JSON object with 'score' (int) and 'feedback' (string).
    """
    
    result = await nvidia_client.generate_structured(prompt=prompt, system_prompt="You are a strict technical grader.")
    return json.dumps(result)
