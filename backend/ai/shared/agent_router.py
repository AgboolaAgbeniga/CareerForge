import json
import os
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import asyncio
from openai import AsyncOpenAI

from resume_parser.tools import registry as parser_registry
from matching_engine.tools import registry as matching_registry
from career_coach.tools import registry as coach_registry
from recruiter_intelligence.tools import registry as recruiter_registry
from operations.tools import registry as operations_registry
from compliance.tools import registry as compliance_registry
from verification.tools import registry as verification_registry
from assessment.tools import registry as assessment_registry

agent_router = APIRouter(prefix="/agent", tags=["Agent Executor"])

# Initialize NVIDIA NIM OpenAI client
client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NVIDIA_API_KEY", "")
)

class Message(BaseModel):
    role: str
    content: str

class AgentInvokeRequest(BaseModel):
    agent_type: str # 'parser', 'matcher', 'coach', 'recruiter'
    messages: List[Message]
    model: str = "meta/llama-3.1-8b-instruct"

# Map agent types to their respective tool registries
AGENT_REGISTRIES = {
    "parser": parser_registry,
    "matcher": matching_registry,
    "coach": coach_registry,
    "recruiter": recruiter_registry,
    "operations": operations_registry,
    "compliance": compliance_registry,
    "verification": verification_registry,
    "assessment": assessment_registry,
}

def route_task_to_model(task_description: str, agent_type: str) -> str:
    """
    Dynamically routes a task to the optimal NVIDIA model based on complexity.
    Replaces static mapping.
    """
    complex_keywords = ["audit", "reasoning", "evaluate", "grade", "screen", "pipeline", "verify"]
    if any(word in task_description.lower() for word in complex_keywords):
        return "meta/llama-3.1-70b-instruct"
    
    # Domain specific overrides
    if agent_type in ["compliance", "assessment", "recruiter"]:
        return "meta/llama-3.1-70b-instruct"
        
    # Default to fast, cheaper model for simple UI interactions or basic matching
    return "meta/llama-3.1-8b-instruct"

@agent_router.post("/invoke")
async def invoke_agent(request: AgentInvokeRequest):
    """
    Invokes an agent with tools using SSE for real-time streaming.
    """
    registry = AGENT_REGISTRIES.get(request.agent_type)
    if not registry:
        return {"error": "Invalid agent_type"}
        
    tools = registry.get_tools()
    
    # Determine which model to use dynamically
    task_desc = request.messages[-1].content if request.messages else ""
    model_to_use = route_task_to_model(task_desc, request.agent_type)
    
    async def generate():
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        
        while True:
            # 1. Call LLM
            response = await client.chat.completions.create(
                model=model_to_use,
                messages=messages,
                tools=tools if tools else None,
                tool_choice="auto" if tools else "none",
                stream=True
            )
            
            tool_calls = []
            current_tool_call = None
            
            async for chunk in response:
                delta = chunk.choices[0].delta
                
                # Yield text content
                if delta.content:
                    yield f"data: {json.dumps({'type': 'text', 'content': delta.content})}\n\n"
                    
                # Handle tool calls
                if delta.tool_calls:
                    for tc in delta.tool_calls:
                        if tc.id:
                            # New tool call
                            current_tool_call = {
                                "id": tc.id,
                                "type": "function",
                                "function": {"name": tc.function.name, "arguments": tc.function.arguments or ""}
                            }
                            tool_calls.append(current_tool_call)
                            yield f"data: {json.dumps({'type': 'tool_start', 'tool': tc.function.name})}\n\n"
                        elif current_tool_call:
                            # Append arguments
                            current_tool_call["function"]["arguments"] += (tc.function.arguments or "")
            
            # If no tool calls, we are done
            if not tool_calls:
                break
                
            # 2. Execute tools
            # Add assistant's tool_call message to history
            assistant_msg = {
                "role": "assistant",
                "content": None,
                "tool_calls": tool_calls
            }
            messages.append(assistant_msg)
            
            for tc in tool_calls:
                try:
                    # Actually execute the python function
                    result = await registry.execute_tool(tc["function"])
                    result_str = json.dumps(result)
                except Exception as e:
                    result_str = str(e)
                    
                yield f"data: {json.dumps({'type': 'tool_result', 'tool': tc['function']['name'], 'result': result_str})}\n\n"
                
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc["id"],
                    "content": result_str
                })
                
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

class InsightRequest(BaseModel):
    page_type: str
    page_context: str
    user_id: str

@agent_router.post("/insights")
async def generate_insight(request: InsightRequest):
    """
    Generates a contextual, actionable AI insight for the given page.
    Returns a JSON object like { "message": "...", "action": "ADD_SKILL", "payload": "React" }
    """
    system_prompt = "You are an AI Career Coach. Based on the user's current page context, provide ONE highly actionable insight. Return strictly a JSON object with keys: 'message' (string, max 2 sentences), 'action' (string, e.g. 'ADD_SKILL', 'UPDATE_PREFERENCES', 'NONE'), and 'payload' (any relevant data for the action)."
    
    user_prompt = f"Page: {request.page_type}\nContext: {request.page_context}\n\nGenerate insight."
    
    response = await client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format={"type": "json_object"}
    )
    
    try:
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return {"message": "Update your profile to get more insights.", "action": "NONE", "payload": None}
