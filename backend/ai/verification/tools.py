import os
import httpx
import json
import urllib.parse
from bs4 import BeautifulSoup
from pydantic import BaseModel, Field
from typing import List
from shared.agent_tools import ToolRegistry
from shared.db import get_pool, fetch_one
from shared.nvidia_client import nvidia_client

registry = ToolRegistry()

# -------------------------------------------------------------------
# Helper: Agent Browser Web Scraper
# -------------------------------------------------------------------
async def agent_browser_scrape(url: str, max_chars: int = 4000) -> str:
    """Simulates the 'agent-browser' skill by fetching a web page and extracting clean text."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        async with httpx.AsyncClient(timeout=10, follow_redirects=True) as client:
            response = await client.get(url, headers=headers)
            if response.status_code != 200:
                return f"[AgentBrowser Error: Status {response.status_code}]"
            
            soup = BeautifulSoup(response.text, "html.parser")
            # Remove scripts and styles
            for element in soup(["script", "style", "nav", "footer", "header"]):
                element.decompose()
                
            text = soup.get_text(separator=" ", strip=True)
            return text[:max_chars]
    except Exception as e:
        return f"[AgentBrowser Error: {str(e)}]"

# -------------------------------------------------------------------
# Tools
# -------------------------------------------------------------------

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
    username = github_url.rstrip('/').split('/')[-1]
    
    if github_api_key:
        # Use Official API
        headers = {"Authorization": f"token {github_api_key}", "Accept": "application/vnd.github.v3+json"}
        async with httpx.AsyncClient(timeout=10) as client:
            try:
                response = await client.get(f"https://api.github.com/users/{username}/repos?per_page=100", headers=headers)
                if response.status_code == 200:
                    repos = response.json()
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
                pass # Fallback to browser below

    # Agent Browser Fallback
    print(f"Executing Agent Browser fallback for GitHub: {username}")
    profile_html_text = await agent_browser_scrape(f"https://github.com/{username}?tab=repositories")
    
    prompt = f"""
    The candidate claims these skills: {declared_skills}.
    I used my Agent Browser to scrape their GitHub Repositories page:
    {profile_html_text[:2000]}
    
    Analyze the scraped text to determine what languages/technologies they frequently use. 
    Return a JSON object with 'proven_competency_score' (0-100), 'reasoning', and 'is_fallback_scrape' (true).
    """
    
    try:
        result = await nvidia_client.generate_structured(prompt=prompt, system_prompt="You are an expert technical auditor analyzing scraped web text.")
        return json.dumps(result)
    except Exception as e:
        return json.dumps({"error": f"Agent Browser LLM generation failed: {str(e)}"})


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
    description="Queries external APIs or uses the Agent Browser to search the web and determine the size, industry, and context of an employer.",
    args_schema=EnrichCompanyDataArgs
)
async def enrich_company_data(company_name: str) -> str:
    clearbit_api_key = os.getenv("CLEARBIT_API_KEY")
    
    if clearbit_api_key:
        async with httpx.AsyncClient(timeout=10) as client:
            try:
                url = f"https://autocomplete.clearbit.com/v1/companies/suggest?query={company_name}"
                response = await client.get(url)
                if response.status_code == 200 and len(response.json()) > 0:
                    return json.dumps(response.json()[0])
            except Exception as e:
                pass # Fallback to browser below
                
    # Agent Browser Fallback using DuckDuckGo HTML search
    print(f"Executing Agent Browser fallback to enrich company: {company_name}")
    query = urllib.parse.quote_plus(f"{company_name} company overview employee count industry")
    ddg_url = f"https://html.duckduckgo.com/html/?q={query}"
    
    scraped_search_results = await agent_browser_scrape(ddg_url, max_chars=3000)
    
    prompt = f"""
    I need to enrich company data for: {company_name}.
    I used an Agent Browser to search the web and got these search results:
    ---
    {scraped_search_results}
    ---
    
    Based on this scraped search result text, infer the company details.
    Return a JSON object containing: 'name', 'estimated_size' (e.g., '10-50', '500+'), 'industry', 'description', and 'source' ('Agent Browser').
    """
    
    try:
        result = await nvidia_client.generate_structured(prompt=prompt, system_prompt="You are an expert corporate intelligence analyst.")
        return json.dumps(result)
    except Exception as e:
        return json.dumps({"error": f"Agent Browser LLM generation failed: {str(e)}"})
