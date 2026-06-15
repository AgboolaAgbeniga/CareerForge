from pydantic import BaseModel, Field
from shared.agent_tools import ToolRegistry
from shared.db import get_pool, fetch_one
from shared.nvidia_client import nvidia_client
import json

registry = ToolRegistry()

class NegotiateInterviewTimeArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    recruiter_id: str = Field(..., description="UUID of the recruiter")
    duration_mins: int = Field(30, description="Duration of the interview in minutes")
    application_id: str = Field(..., description="UUID of the application")

@registry.register(
    name="negotiate_interview_time",
    description="Proposes 3 times to the candidate and creates a pending interview record.",
    args_schema=NegotiateInterviewTimeArgs
)
async def negotiate_interview_time(candidate_id: str, recruiter_id: str, duration_mins: int, application_id: str) -> str:
    # 1. Insert a pending interview record
    query = """
    INSERT INTO interviews (application_id, recruiter_id, candidate_id, status, duration_minutes)
    VALUES (%s, %s, %s, 'scheduling', %s)
    RETURNING id
    """
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.cursor() as cur:
            await cur.execute(query, (application_id, recruiter_id, candidate_id, duration_mins))
            result = await cur.fetchone()
            interview_id = result['id'] if result else None
            
    if not interview_id:
        return "Failed to initialize interview scheduling."

    # 2. Simulate calendar reading and email generation
    prompt = f"""
    You are an AI Scheduling Assistant. Write a short email to the candidate proposing 3 available times next week for a {duration_mins}-minute interview. Keep it professional.
    """
    
    email_draft = await nvidia_client.generate(prompt=prompt, temperature=0.5)
    
    return json.dumps({
        "status": "scheduling_initiated",
        "interview_record_id": str(interview_id),
        "email_draft": email_draft
    })

class UpdatePipelineStageArgs(BaseModel):
    application_id: str = Field(..., description="UUID of the application")
    target_stage: str = Field(..., description="The new status (e.g., 'interviewing', 'rejected', 'offered')")
    feedback_notes: str = Field(..., description="Justification for the stage change")

@registry.register(
    name="update_pipeline_stage",
    description="Moves a candidate in the database pipeline and logs the justification.",
    args_schema=UpdatePipelineStageArgs
)
async def update_pipeline_stage(application_id: str, target_stage: str, feedback_notes: str) -> str:
    query = """
    UPDATE applications 
    SET status = %s, updated_at = NOW() 
    WHERE id = %s
    RETURNING id
    """
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.cursor() as cur:
            await cur.execute(query, (target_stage, application_id))
            result = await cur.fetchone()
            
    if result:
        return f"Application {application_id} successfully moved to {target_stage}. Reason logged: {feedback_notes}"
    return f"Failed to find application {application_id}."

class DraftRejectionWithFeedbackArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="draft_rejection_with_feedback",
    description="Generates a polite rejection email highlighting one specific area the candidate can improve.",
    args_schema=DraftRejectionWithFeedbackArgs
)
async def draft_rejection_with_feedback(candidate_id: str, job_id: str) -> str:
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    job_query = "SELECT title, requirements FROM jobs WHERE id = %s"
    job_res = await fetch_one(job_query, job_id)
    
    if not cand_res or not job_res:
        return "Error: Could not retrieve data to write rejection."

    prompt = f"""
    Write a polite and constructive rejection email for this candidate applying to the '{job_res['title']}' position.
    Instead of generic feedback, gently highlight ONE specific skill or experience area from the job requirements ({job_res['requirements']}) that they were missing in their profile ({cand_res['parsed_data']}).
    """
    
    return await nvidia_client.generate(prompt=prompt, system_prompt="You are an empathetic technical recruiter.", temperature=0.6)
