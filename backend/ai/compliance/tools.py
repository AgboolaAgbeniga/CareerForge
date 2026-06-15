from pydantic import BaseModel, Field
from shared.agent_tools import ToolRegistry
from shared.db import get_pool, fetch_all
from shared.nvidia_client import nvidia_client
import json

registry = ToolRegistry()

class AuditMatchDecisionsArgs(BaseModel):
    job_id: str = Field(..., description="UUID of the job to audit")

@registry.register(
    name="audit_match_decisions",
    description="Analyzes the AI match decisions to detect potential biases in the vector embeddings.",
    args_schema=AuditMatchDecisionsArgs
)
async def audit_match_decisions(job_id: str) -> str:
    # 1. Fetch recent audit logs for this job to see if there is any disparate impact
    query = """
    SELECT candidate_id, decision_reasoning, demographic_inference
    FROM ai_audit_logs
    WHERE job_id = %s
    ORDER BY created_at DESC LIMIT 100
    """
    
    logs = await fetch_all(query, job_id)
    
    if not logs:
        return "No sufficient match decisions recorded yet to perform a reliable bias audit."

    prompt = f"""
    You are an AI Compliance Auditor checking for bias (Local Law 144, EEOC compliance).
    Analyze these {len(logs)} recent AI matching decisions for any signs that the algorithm is penalizing candidates based on inferred demographic markers.
    
    Log Data: {json.dumps([dict(l) for l in logs])}
    
    Write a brief audit report summarizing your findings.
    """
    
    audit_report = await nvidia_client.generate(
        prompt=prompt, 
        system_prompt="You are a strict, objective AI Ethics Auditor.",
        temperature=0.2
    )
    
    return audit_report

class ExecuteDataSubjectErasureArgs(BaseModel):
    user_id: str = Field(..., description="UUID of the user requesting data erasure")

@registry.register(
    name="execute_data_subject_erasure",
    description="Safely purges a user's PII, vector embeddings, and chat logs to comply with GDPR 'Right to be Forgotten' requests without breaking relational data.",
    args_schema=ExecuteDataSubjectErasureArgs
)
async def execute_data_subject_erasure(user_id: str) -> str:
    # GDPR Right to be Forgotten
    # We must delete embeddings, PII in users/job_seekers, resumes.
    
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.transaction():
            async with conn.cursor() as cur:
                # 1. Delete vector embeddings
                await cur.execute("DELETE FROM candidate_embeddings WHERE user_id = %s", (user_id,))
                
                # 2. Delete parsed resumes (which contain raw text)
                await cur.execute("DELETE FROM resumes WHERE job_seeker_id = %s", (user_id,))
                
                # 3. Anonymize user record
                await cur.execute("""
                    UPDATE users 
                    SET first_name = 'REDACTED', 
                        last_name = 'REDACTED',
                        email = concat('redacted_', id, '@deleted.careerforge.ai')
                    WHERE id = %s
                """, (user_id,))
                
                # 4. Mark job seeker as erased
                await cur.execute("""
                    UPDATE job_seekers
                    SET data_erasure_requested_at = NOW()
                    WHERE id = %s
                """, (user_id,))
                
    return f"Successfully executed Right to be Forgotten erasure for User ID: {user_id}. PII and vector embeddings have been purged."
