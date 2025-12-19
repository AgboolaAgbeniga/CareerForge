"""
FastAPI application for Job Matching Engine service
"""
import asyncio
from contextlib import asynccontextmanager
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from ai.matching_engine.matcher import JobMatcher, MatchResult, CandidateAnalysis
from ai.shared.config import config
from ai.shared.utils import get_logger

logger = get_logger(__name__)

# Global matcher instance
matcher: JobMatcher = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global matcher
    logger.info("Starting Job Matching Engine...")

    # Initialize matcher
    matcher = JobMatcher()

    yield

    logger.info("Shutting down Job Matching Engine...")

app = FastAPI(
    title="Job Matching Engine API",
    description="AI-powered job-candidate matching using Hugging Face models",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "matching-engine"}

@app.post("/match", response_model=MatchResponse)
async def calculate_match(job_seeker: JobSeekerData, job: JobData):
    """Calculate match score between job seeker and job"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        result = matcher.calculate_match_score(job_seeker.dict(), job.dict())

        return MatchResponse(**result.__dict__)

    except Exception as e:
        logger.error(f"Match calculation error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/matches/{job_seeker_id}")
async def find_matches(job_seeker_id: int, jobs: List[JobData], top_k: int = 10):
    """Find best job matches for a job seeker"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        # Mock job seeker data (would come from database)
        job_seeker = {
            "id": job_seeker_id,
            "title": "Software Developer",
            "skills": ["Python", "JavaScript", "React"],
            "experience_years": 3,
            "education": "Bachelor's in Computer Science",
            "summary": "Passionate developer with experience in web development"
        }

        matches = matcher.find_best_matches(job_seeker, [job.dict() for job in jobs], top_k)

        return {
            "matches": [MatchResponse(**match.__dict__) for match in matches]
        }

    except Exception as e:
        logger.error(f"Find matches error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/candidates/{job_id}")
async def analyze_candidates(job_id: int, candidates: List[JobSeekerData]):
    """Analyze candidates for a job posting"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        # Mock job data (would come from database)
        job = {
            "id": job_id,
            "title": "Senior Software Engineer",
            "description": "Looking for experienced developer",
            "requirements": "Strong programming skills required",
            "skills_required": ["Python", "JavaScript", "AWS"],
            "experience_level": "senior"
        }

        analyses = matcher.analyze_candidates_for_job(job, [candidate.dict() for candidate in candidates])

        return {
            "candidates": [CandidateAnalysisResponse(**analysis.__dict__) for analysis in analyses]
        }

    except Exception as e:
        logger.error(f"Candidate analysis error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/hiring-suggestions")
async def get_hiring_suggestions(job_draft: Dict[str, Any]):
    """Get AI suggestions for job posting improvements"""
    try:
        if not matcher:
            raise HTTPException(status_code=503, detail="Matcher not initialized")

        suggestions = matcher.get_hiring_suggestions(job_draft)

        return suggestions

    except Exception as e:
        logger.error(f"Hiring suggestions error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/train")
async def trigger_retraining():
    """Trigger model retraining (placeholder for future)"""
    try:
        # This would implement model retraining logic
        return {
            "status": "training_started",
            "estimated_completion": "2024-01-01T12:00:00Z",
            "message": "Model retraining initiated"
        }

    except Exception as e:
        logger.error(f"Training trigger error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=config.MATCHING_ENGINE_PORT,
        reload=True,
        log_level="info"
    )