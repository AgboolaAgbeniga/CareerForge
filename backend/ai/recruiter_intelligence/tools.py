import json
from pydantic import BaseModel, Field
from shared.agent_tools import ToolRegistry
from shared.db import get_candidate_profile, get_job_description, get_company_details, fetch_all
from shared.nvidia_client import nvidia_client

registry = ToolRegistry()

class GenerateCandidateSummaryArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="generate_candidate_summary",
    description="Synthesizes a 3-bullet-point summary explaining exactly why a candidate was recommended for the job.",
    args_schema=GenerateCandidateSummaryArgs
)
async def generate_candidate_summary(candidate_id: str, job_id: str) -> str:
    profile = await get_candidate_profile(candidate_id)
    job = await get_job_description(job_id)
    
    if not profile or not job:
        return "Error: Candidate or Job not found."
        
    prompt = f"""
    Based on the candidate's profile and the job description, write a 3-bullet-point summary explaining exactly why they are a strong match.
    Format as markdown bullets.
    
    Candidate Profile: {json.dumps(profile)}
    Job Description: {json.dumps(job)}
    """
    
    return await nvidia_client.generate(
        prompt=prompt, 
        system_prompt="You are an expert technical recruiter. Be concise and persuasive."
    )

class ScreenCandidateArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="screen_candidate_against_criteria",
    description="Acts as an automated technical screener. Evaluates the candidate against the 'Must Haves' and returns a boolean pass/fail with justification.",
    args_schema=ScreenCandidateArgs
)
async def screen_candidate_against_criteria(candidate_id: str, job_id: str) -> dict:
    profile = await get_candidate_profile(candidate_id)
    job = await get_job_description(job_id)
    
    if not profile or not job:
        return {"error": "Candidate or Job not found."}

    system_prompt = "You are an expert technical recruiter screener. Return ONLY a valid JSON object with keys 'pass' (boolean) and 'justification' (string)."
    prompt = f"""
    Evaluate this candidate against the job criteria.
    
    JOB DESCRIPTION: {json.dumps(job)}
    CANDIDATE PROFILE: {json.dumps(profile)}
    
    Does the candidate meet the requirements?
    """

    return await nvidia_client.generate_structured(
        prompt=prompt,
        system_prompt=system_prompt,
        temperature=0.1
    )

class DraftOutreachSequenceArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="draft_outreach_sequence",
    description="Writes a highly personalized cold-outreach email referencing specific projects from the candidate's profile.",
    args_schema=DraftOutreachSequenceArgs
)
async def draft_outreach_sequence(candidate_id: str, job_id: str) -> str:
    profile = await get_candidate_profile(candidate_id)
    job = await get_job_description(job_id)
    company = await get_company_details(job['company_id']) if job and job.get('company_id') else None
    
    if not profile or not job:
        return "Error: Candidate or Job not found."

    system_prompt = "You are an expert recruiter. Write a highly personalized, compelling cold outreach email to this candidate about a job opportunity."
    prompt = f"""
    Candidate Profile: {json.dumps(profile)}
    Job Opportunity: {json.dumps(job)}
    Company Info: {json.dumps(company)}
    
    Write the email. Mention specific things from their profile that align with the job responsibilities. Keep it under 200 words.
    """

    return await nvidia_client.generate(
        prompt=prompt,
        system_prompt=system_prompt,
        temperature=0.7
    )

class AnalyzeTalentPoolArgs(BaseModel):
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="analyze_talent_pool_stats",
    description="A data-analysis tool that queries the DB to tell the recruiter stats about the talent pool.",
    args_schema=AnalyzeTalentPoolArgs
)
async def analyze_talent_pool_stats(job_id: str) -> str:
    # Get total job seekers count
    stats_query = "SELECT count(*) as total_candidates, avg(salary_min) as avg_salary FROM job_seekers"
    stats_res = await fetch_all(stats_query)
    
    job_data = await get_job_description(job_id)
    
    prompt = f"""
    You are a data analyst for recruiters. Write a 2-sentence summary about the talent pool.
    
    Database Stats: {json.dumps([dict(r) for r in stats_res])}
    Job Req: {json.dumps(job_data)}
    """
    
    return await nvidia_client.generate(
        prompt=prompt,
        system_prompt="You are a helpful analytics assistant for recruiters.",
        temperature=0.4
    )

