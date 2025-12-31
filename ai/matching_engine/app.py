"""
Job Matching Engine router for combined AI service
"""
from typing import List, Dict, Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.utils import get_logger

logger = get_logger(__name__)

# Global matcher instance
matcher = None

# Router
matching_router = APIRouter()

# Pydantic models
class JobSeekerData(BaseModel):
    id: int
    title: str = ""
    skills: List[str] = []
    experience_years: int = 0
    education: str = ""
    summary: str = ""

class JobData(BaseModel):
    id: int
    title: str
    description: str = ""
    requirements: str = ""
    skills_required: List[str] = []
    experience_level: str = "entry"

class MatchResponse(BaseModel):
    score: float
    semantic_similarity: float
    skill_match: float
    experience_match: float
    reasons: List[str]
    job_id: int
    candidate_id: int

class CandidateAnalysisResponse(BaseModel):
    candidate_id: int
    job_id: int
    overall_score: float
    skill_alignment: float
    experience_fit: float
    cultural_fit: float
    recommendations: List[str]

async def init_matcher():
    """Initialize the job matcher"""
    global matcher
    from .matcher import JobMatcher
    logger.info("Initializing Job Matcher...")
    matcher = JobMatcher()

@matching_router.post("/matching/jobs")
async def get_job_matches(data: dict):
    """Find job matches for a job seeker"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        job_seeker_id = data.get('jobSeekerId')
        skills = data.get('skills', [])
        preferences = data.get('preferences', {})

        # Mock job seeker data (would come from database)
        job_seeker = {
            "id": job_seeker_id,
            "title": "Software Developer",
            "skills": skills,
            "experience_years": preferences.get('experience_years', 0),
            "education": preferences.get('education', ''),
            "summary": preferences.get('summary', '')
        }

        # Mock jobs (would come from database)
        jobs = [
            {
                "id": 101,
                "title": "Senior Frontend Engineer",
                "description": "Lead our frontend team building responsive web applications using React and Next.js.",
                "requirements": "Expert in React, TypeScript, and modern CSS. Experience with state management and performance optimization.",
                "skills_required": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
                "experience_level": "senior"
            },
            {
                "id": 102,
                "title": "Backend Developer (Python)",
                "description": "Build scalable microservices and APIs for our high-traffic platform.",
                "requirements": "Strong Python knowledge, experience with FastAPI or Django. Knowledge of SQL and NoSQL databases.",
                "skills_required": ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
                "experience_level": "mid"
            },
            {
                "id": 103,
                "title": "AI/ML Engineer",
                "description": "Develop and deploy machine learning models for recommendation systems.",
                "requirements": "Experience with PyTorch or TensorFlow. NLP background preferred.",
                "skills_required": ["Python", "PyTorch", "Machine Learning", "NLP", "AWS"],
                "experience_level": "mid"
            },
            {
                "id": 104,
                "title": "Product Designer",
                "description": "Design intuitive user interfaces and user experiences for our products.",
                "requirements": "Proficiency in Figma. Strong portfolio demonstrating UX/UI skills.",
                "skills_required": ["Figma", "UI Design", "UX Research", "Prototyping"],
                "experience_level": "mid"
            },
            {
                "id": 105,
                "title": "DevOps Engineer",
                "description": "Manage our cloud infrastructure and CI/CD pipelines.",
                "requirements": "Experience with AWS, Kubernetes, and Jenkins/GitHub Actions.",
                "skills_required": ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux"],
                "experience_level": "senior"
            }
        ]

        matches = matcher.find_best_matches(job_seeker, jobs, 10)

        return {
            "matches": [match.__dict__ for match in matches]
        }

    except Exception as e:
        logger.error(f"Job matches error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@matching_router.post("/matching/candidates")
async def get_candidate_matches(data: dict):
    """Analyze candidates for a job"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        job_id = data.get('jobId')

        # Mock job data (would come from database)
        job = {
            "id": job_id,
            "title": "Senior Software Engineer",
            "description": "Looking for experienced developer",
            "requirements": "Strong programming skills required",
            "skills_required": ["Python", "JavaScript", "AWS"],
            "experience_level": "senior"
        }

        # Mock candidates (would come from database)
        candidates = []

        analyses = matcher.analyze_candidates_for_job(job, candidates)

        return {
            "candidates": [analysis.__dict__ for analysis in analyses]
        }

    except Exception as e:
        logger.error(f"Candidate matches error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@matching_router.post("/hiring/suggestions")
async def get_hiring_suggestions(data: dict):
    """Get AI suggestions for job posting improvements"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        suggestions = matcher.get_hiring_suggestions(data)
        return suggestions

    except Exception as e:
        logger.error(f"Hiring suggestions error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@matching_router.post("/hiring/analyze-resume")
async def analyze_resume(data: dict):
    """Analyze resume for recruiter"""
    try:
        # Placeholder implementation
        return {"analysis": "Resume analysis placeholder"}
    except Exception as e:
        logger.error(f"Resume analysis error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")