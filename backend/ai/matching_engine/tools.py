from pydantic import BaseModel, Field
from typing import List, Dict, Any
from shared.agent_tools import ToolRegistry
from shared.db import fetch_all, fetch_one
from shared.nvidia_client import nvidia_client

registry = ToolRegistry()

class HybridCandidateSearchArgs(BaseModel):
    job_embedding: List[float] = Field(..., description="The vector embedding of the job description")
    scalar_filters: Dict[str, Any] = Field(..., description="Filters like location, years_experience, salary")

@registry.register(
    name="hybrid_candidate_search",
    description="Performs a hybrid search combining semantic similarity (pgvector) with scalar metadata filters using a weighted composite score.",
    args_schema=HybridCandidateSearchArgs
)
async def hybrid_candidate_search(job_embedding: List[float], scalar_filters: Dict[str, Any]) -> List[dict]:
    # Ensure pgvector format: '[0.1, 0.2, ...]'
    embedding_str = "[" + ",".join(map(str, job_embedding)) + "]"
    
    # We use a composite scoring system: vector similarity (70% weight) + scalar boosts (30% weight)
    query = """
    WITH semantic_matches AS (
        SELECT ce.user_id, 
               ce.model_id, 
               1 - (ce.embedding <=> %s::vector) as vector_score,
               js.salary_min, 
               js.salary_max, 
               js.location_preference
        FROM candidate_embeddings ce
        JOIN job_seekers js ON ce.user_id = js.id
    )
    SELECT user_id, 
           model_id, 
           vector_score,
           salary_min, 
           salary_max, 
           location_preference,
           (
             (vector_score * 0.7) +
             (CASE WHEN location_preference ILIKE %s THEN 0.2 ELSE 0.0 END) +
             (CASE WHEN %s BETWEEN salary_min AND salary_max THEN 0.1 ELSE 0.0 END)
           ) as composite_score
    FROM semantic_matches
    ORDER BY composite_score DESC 
    LIMIT 10
    """
    
    location_filter = f"%{scalar_filters.get('location', '')}%"
    salary_target = scalar_filters.get('salary', 0)
    
    params = [embedding_str, location_filter, salary_target]
    
    results = await fetch_all(query, *params)
    return [dict(r) for r in results]

class HybridJobSearchArgs(BaseModel):
    candidate_embedding: List[float] = Field(..., description="The vector embedding of the candidate profile")
    scalar_filters: Dict[str, Any] = Field(..., description="Filters like remote_only, visa_sponsorship")

@registry.register(
    name="hybrid_job_search",
    description="Finds jobs semantically aligned with the candidate's profile, respecting scalar filters via composite scoring.",
    args_schema=HybridJobSearchArgs
)
async def hybrid_job_search(candidate_embedding: List[float], scalar_filters: Dict[str, Any]) -> List[dict]:
    embedding_str = "[" + ",".join(map(str, candidate_embedding)) + "]"
    
    query = """
    WITH semantic_jobs AS (
        SELECT je.job_id, 
               je.model_id, 
               1 - (je.embedding <=> %s::vector) as vector_score,
               j.title, 
               j.location, 
               j.work_mode
        FROM job_embeddings je
        JOIN jobs j ON je.job_id = j.id
        WHERE j.status = 'published'
    )
    SELECT job_id, 
           model_id, 
           title, 
           location, 
           work_mode,
           vector_score,
           (
             (vector_score * 0.8) +
             (CASE WHEN work_mode = 'remote' AND %s = true THEN 0.2 ELSE 0.0 END)
           ) as composite_score
    FROM semantic_jobs
    ORDER BY composite_score DESC 
    LIMIT 10
    """
    
    remote_only = scalar_filters.get("remote_only", False)
    params = [embedding_str, remote_only]
    
    results = await fetch_all(query, *params)
    return [dict(r) for r in results]

class CalculateMultidimensionalMatchArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")
    job_id: str = Field(..., description="UUID of the job")

@registry.register(
    name="calculate_multidimensional_match",
    description="Computes sub-scores for Hard Skills, Experience, and Domain Match.",
    args_schema=CalculateMultidimensionalMatchArgs
)
async def calculate_multidimensional_match(candidate_id: str, job_id: str) -> dict:
    # Fetch candidate info
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    cand_data = cand_res['parsed_data'] if cand_res else {}
    
    # Fetch job info
    job_query = "SELECT title, description, skills_required FROM jobs WHERE id = %s"
    job_res = await fetch_one(job_query, job_id)
    
    if not cand_res or not job_res:
        return {"hard_skills_match": 0, "experience_match": 0, "domain_match": 0, "error": "Not found"}

    prompt = f"""
    Calculate a multi-dimensional match score between this candidate and job.
    Return ONLY JSON with keys: hard_skills_match (0-100), experience_match (0-100), domain_match (0-100), reasoning (string).
    
    Candidate Data: {cand_data}
    Job Data: {job_res['title']} - {job_res['skills_required']} - {job_res['description']}
    """
    
    return await nvidia_client.generate_structured(
        prompt=prompt,
        system_prompt="You are an expert HR matching algorithm.",
        temperature=0.1
    )

class ExtractJobRequirementsArgs(BaseModel):
    raw_job_description: str = Field(..., description="The raw text of the job description")

@registry.register(
    name="extract_job_requirements",
    description="Parses a raw job post into mandatory_skills, nice_to_have_skills, and responsibilities.",
    args_schema=ExtractJobRequirementsArgs
)
async def extract_job_requirements(raw_job_description: str) -> dict:
    prompt = f"""
    Extract the following from the job description:
    - mandatory_skills (list of strings)
    - nice_to_have_skills (list of strings)
    - responsibilities (list of strings)
    
    Job Description:
    {raw_job_description}
    """
    return await nvidia_client.generate_structured(
        prompt=prompt,
        system_prompt="You are an expert job parser. Return valid JSON.",
        temperature=0.1
    )

