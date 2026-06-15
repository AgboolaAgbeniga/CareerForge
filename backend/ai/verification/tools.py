import os
import httpx
import json
from pydantic import BaseModel, Field
from typing import List
from shared.agent_tools import ToolRegistry
from shared.db import get_pool, fetch_one
from shared.nvidia_client import nvidia_client

registry = ToolRegistry()

class VerifyGithubContributionsArgs(BaseModel):
    github_url: str = Field(..., description="The candidate's GitHub profile URL")
    declared_skills: List[str] = Field(..., description="Skills the candidate claims to have (e.g., ['Python', 'React'])")

@registry.register(
    name="verify_github_contributions",
    description="Scrapes public GitHub repositories to verify if the candidate actually writes code in the languages they claim.",
    args_schema=VerifyGithubContributionsArgs
)
async def verify_github_contributions(github_url: str, declared_skills: List[str]) -> str:
    github_api_key = os.getenv("GITHUB_API_KEY")
    if not github_api_key:
        return json.dumps({
            "error": "GITHUB_API_KEY not configured. Cannot perform deep verification.",
            "fallback_score": 50,
            "note": "Awaiting API key integration from recruiter."
        })
        
    username = github_url.rstrip('/').split('/')[-1]
    headers = {"Authorization": f"token {github_api_key}", "Accept": "application/vnd.github.v3+json"}
    
    async with httpx.AsyncClient(timeout=10) as client:
        try:
            # Fetch repos
            response = await client.get(f"https://api.github.com/users/{username}/repos?per_page=100", headers=headers)
            if response.status_code != 200:
                return json.dumps({"error": f"Failed to fetch GitHub data: {response.status_code}"})
                
            repos = response.json()
            
            # Analyze languages
            languages = {}
            for r in repos:
                lang = r.get("language")
                if lang:
                    languages[lang] = languages.get(lang, 0) + 1
                    
            prompt = f"""
            The candidate claims these skills: {declared_skills}.
            Their public GitHub shows these languages across their repos: {languages}.
            Return a JSON object with a 'proven_competency_score' (0-100) and 'reasoning'.
            """
            
            result = await nvidia_client.generate_structured(prompt=prompt, system_prompt="You are a strict technical auditor.")
            return json.dumps(result)
            
        except Exception as e:
            return json.dumps({"error": f"GitHub API error: {str(e)}"})

class CrossReferenceTimelineArgs(BaseModel):
    candidate_id: str = Field(..., description="UUID of the candidate")

@registry.register(
    name="cross_reference_timeline",
    description="Analyzes the candidate's work history for overlapping dates, unexplained employment gaps, or logic errors.",
    args_schema=CrossReferenceTimelineArgs
)
async def cross_reference_timeline(candidate_id: str) -> str:
    cand_query = "SELECT parsed_data FROM resumes WHERE job_seeker_id = %s AND is_active = true"
    cand_res = await fetch_one(cand_query, candidate_id)
    
    if not cand_res:
        return "Error: Could not retrieve resume data."
        
    prompt = f"""
    Analyze this resume JSON for chronological logic errors, overlapping employment dates that seem impossible, or massive unexplained gaps.
    Return a JSON object with keys 'is_suspicious' (boolean), 'flags' (list of strings), and 'analysis' (string).
    
    Resume Data: {cand_res['parsed_data']}
    """
    
    result = await nvidia_client.generate_structured(prompt=prompt, system_prompt="You are an expert background checker.")
    return json.dumps(result)

class EnrichCompanyDataArgs(BaseModel):
    company_name: str = Field(..., description="Name of the company")

@registry.register(
    name="enrich_company_data",
    description="Queries external APIs (Clearbit/Crunchbase) to determine the size, industry, and tech stack of an employer.",
    args_schema=EnrichCompanyDataArgs
)
async def enrich_company_data(company_name: str) -> str:
    clearbit_api_key = os.getenv("CLEARBIT_API_KEY")
    if not clearbit_api_key:
        return json.dumps({
            "error": "CLEARBIT_API_KEY not configured.",
            "mocked_data": {
                "name": company_name,
                "estimated_size": "50-200 employees",
                "industry": "Technology",
                "note": "This is simulated data. Please configure Clearbit API for real enrichment."
            }
        })
        
    # In a real environment, we'd call the Clearbit Autocomplete or Discovery API here.
    # For now, we simulate the structure of a Clearbit response to ensure the agent handles it properly.
    
    async with httpx.AsyncClient(timeout=10) as client:
        try:
            # Example clearbit endpoint (name-to-domain)
            url = f"https://autocomplete.clearbit.com/v1/companies/suggest?query={company_name}"
            response = await client.get(url)
            
            if response.status_code == 200 and len(response.json()) > 0:
                best_match = response.json()[0]
                domain = best_match.get("domain")
                
                return json.dumps({
                    "name": best_match.get("name"),
                    "domain": domain,
                    "logo": best_match.get("logo"),
                    "source": "Clearbit"
                })
            else:
                return json.dumps({"error": "No company found in Clearbit autocomplete."})
                
        except Exception as e:
            return json.dumps({"error": f"Clearbit API error: {str(e)}"})
