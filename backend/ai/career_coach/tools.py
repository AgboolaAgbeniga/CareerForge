from pydantic import BaseModel, Field
from typing import List
from shared.agent_tools import ToolRegistry
from shared.db import fetch_one, fetch_all
from shared.nvidia_client import nvidia_client
import json

registry = ToolRegistry()

class GetUserContextArgs(BaseModel):
    user_id: str = Field(..., description="UUID of the user")

@registry.register(
    name="get_user_context",
    description="Retrieves the user's full profile, past applications, and historical conversation memory from the database.",
    args_schema=GetUserContextArgs
)
async def get_user_context(user_id: str) -> dict:
    # Fetch profile
    profile_query = """
    SELECT u.first_name, u.last_name, js.location_preference, js.salary_min, js.salary_max
    FROM users u
    JOIN job_seekers js ON u.id = js.id
    WHERE u.id = %s
    """
    profile_res = await fetch_one(profile_query, user_id)
    
    # Fetch applications
    apps_query = """
    SELECT a.id, a.status, a.created_at, j.title, c.name as company_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    WHERE a.user_id = %s
    ORDER BY a.created_at DESC LIMIT 5
    """
    apps_res = await fetch_all(apps_query, user_id)
    
    return {
        "profile": dict(profile_res) if profile_res else {},
        "recent_applications": [dict(a) for a in apps_res]
    }

class GenerateGapAnalysisArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    target_job_id: str = Field(..., description="UUID of the target job")

@registry.register(
    name="generate_gap_analysis",
    description="Identifies exactly which skills or experiences the candidate is missing for a specific role.",
    args_schema=GenerateGapAnalysisArgs
)
async def generate_gap_analysis(candidate_id: str, target_job_id: str) -> dict:
    # Fetch candidate
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    # Fetch job
    job_query = "SELECT title, description, requirements FROM jobs WHERE id = %s"
    job_res = await fetch_one(job_query, target_job_id)
    
    if not cand_res or not job_res:
        return {"error": "Candidate or Job not found"}
        
    prompt = f"""
    Perform a gap analysis for this candidate applying to this job.
    Return JSON with two lists: "missing_skills" (strings) and "missing_experience" (strings).
    
    Candidate Data: {cand_res['parsed_data']}
    Job Data: {job_res['title']} - {job_res['requirements']}
    """
    
    return await nvidia_client.generate_structured(prompt=prompt, temperature=0.2)

class SuggestLearningPathArgs(BaseModel):
    missing_skills: List[str] = Field(..., description="List of missing skills")

@registry.register(
    name="suggest_learning_path",
    description="Recommends specific certifications, project types, or courses to bridge the identified skill gaps.",
    args_schema=SuggestLearningPathArgs
)
async def suggest_learning_path(missing_skills: List[str]) -> List[dict]:
    prompt = f"""
    Suggest a fast-track learning path to acquire these skills: {missing_skills}.
    Return a JSON object with a single key "learning_path" containing a list of objects, each with "skill", "recommended_course_or_cert", and "estimated_hours".
    """
    
    res = await nvidia_client.generate_structured(prompt=prompt, temperature=0.4)
    return res.get("learning_path", [])

class TailorResumeBulletsArgs(BaseModel):
    candidate_experience_block: str = Field(..., description="The specific work experience text to tailor")
    target_job_description: str = Field(..., description="The target job description text")

@registry.register(
    name="tailor_resume_bullets",
    description="Rewrites a candidate's specific work experience bullet points to better highlight the keywords and achievements relevant to the target job.",
    args_schema=TailorResumeBulletsArgs
)
async def tailor_resume_bullets(candidate_experience_block: str, target_job_description: str) -> str:
    prompt = f"""
    Rewrite the following resume bullet points to better align with the keywords and required impact of the Target Job Description.
    Keep it truthful, but frame it better. Return only the rewritten text, formatted as markdown bullet points.
    
    Candidate Experience: {candidate_experience_block}
    Target Job: {target_job_description}
    """
    
    return await nvidia_client.generate(prompt=prompt, system_prompt="You are an expert resume writer.", temperature=0.5)

class DraftCoverLetterArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the target job")
    tone: str = Field(..., description="The tone of the cover letter (e.g., professional, enthusiastic)")

@registry.register(
    name="draft_hyper_personalized_cover_letter",
    description="Generates a cover letter that explicitly connects the candidate's past achievements to the company's specific job requirements.",
    args_schema=DraftCoverLetterArgs
)
async def draft_hyper_personalized_cover_letter(candidate_id: str, job_id: str, tone: str) -> str:
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    job_query = "SELECT j.title, j.description, c.name as company_name FROM jobs j JOIN companies c ON j.company_id = c.id WHERE j.id = %s"
    job_res = await fetch_one(job_query, job_id)
    
    if not cand_res or not job_res:
        return "Error gathering data for cover letter."
        
    prompt = f"""
    Write a {tone} cover letter for the candidate applying to {job_res['company_name']} for the {job_res['title']} position.
    Specifically reference their past projects from the resume that align with the job description.
    
    Candidate Data: {cand_res['parsed_data']}
    Job Data: {job_res['description']}
    """
    
    return await nvidia_client.generate(prompt=prompt, temperature=0.7)

class SimulateInterviewArgs(BaseModel):
    job_id: str = Field(..., description="UUID of the target job")
    candidate_id: str = Field(..., description="UUID of the candidate")

@registry.register(
    name="simulate_interview",
    description="Generates highly specific technical and behavioral interview questions based on the job description and candidate's profile.",
    args_schema=SimulateInterviewArgs
)
async def simulate_interview(job_id: str, candidate_id: str) -> List[str]:
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    job_query = "SELECT title, requirements FROM jobs WHERE id = %s"
    job_res = await fetch_one(job_query, job_id)
    
    if not cand_res or not job_res:
        return []
        
    prompt = f"""
    Generate 5 highly specific interview questions (3 technical, 2 behavioral) for this candidate applying to this job.
    Base the questions on the intersection of the job requirements and the candidate's listed skills.
    Return a JSON object with a single key "questions" containing a list of strings.
    
    Candidate Data: {cand_res['parsed_data']}
    Job Data: {job_res['title']} - {job_res['requirements']}
    """
    
    res = await nvidia_client.generate_structured(prompt=prompt, temperature=0.6)
    return res.get("questions", [])

