"""
FastAPI application for Career Coach service
"""
import asyncio
from contextlib import asynccontextmanager
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from coach import CareerCoach, CareerAdvice, LinkedInOptimization, CoverLetter
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.config import config
from shared.utils import get_logger

logger = get_logger(__name__)

# Global coach instance
coach: CareerCoach = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global coach
    logger.info("Starting Career Coach service...")

    # Initialize coach
    coach = CareerCoach()

    yield

    logger.info("Shutting down Career Coach service...")

app = FastAPI(
    title="Career Coach API",
    description="AI-powered career coaching using Hugging Face models",
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
class UserProfile(BaseModel):
    id: int
    title: str = ""
    skills: List[str] = []
    experience_years: int = 0
    education: str = ""
    summary: str = ""

class AdviceRequest(BaseModel):
    user_profile: UserProfile
    context: str

class AdviceResponse(BaseModel):
    advice: str
    action_items: List[str]
    resources: List[str]
    confidence_score: float

class LinkedInRequest(BaseModel):
    current_headline: str
    target_role: str

class LinkedInResponse(BaseModel):
    optimized_headline: str
    suggestions: List[str]
    keywords_added: List[str]

class CoverLetterRequest(BaseModel):
    job_id: int
    resume_data: Dict[str, Any]

class CoverLetterResponse(BaseModel):
    content: str
    key_points: List[str]
    customization_notes: str

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "career-coach"}

@app.post("/advice", response_model=AdviceResponse)
async def get_career_advice(request: AdviceRequest):
    """Get personalized career advice"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        result = coach.provide_advice(request.user_profile.dict(), request.context)

        return AdviceResponse(**result.__dict__)

    except Exception as e:
        logger.error(f"Advice error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/linkedin-optimize", response_model=LinkedInResponse)
async def optimize_linkedin(request: LinkedInRequest):
    """Optimize LinkedIn profile headline"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        result = coach.optimize_linkedin_profile(request.current_headline, request.target_role)

        return LinkedInResponse(**result.__dict__)

    except Exception as e:
        logger.error(f"LinkedIn optimization error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/cover-letter", response_model=CoverLetterResponse)
async def generate_cover_letter(request: CoverLetterRequest):
    """Generate personalized cover letter"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        result = coach.generate_cover_letter(request.job_id, request.resume_data)

        return CoverLetterResponse(**result.__dict__)

    except Exception as e:
        logger.error(f"Cover letter generation error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/skill-gaps/{job_seeker_id}")
async def analyze_skill_gaps(job_seeker_id: int, roles: str = ""):
    """Analyze skill gaps for target roles"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        target_roles = roles.split(",") if roles else ["software engineer"]

        result = coach.analyze_skill_gaps(job_seeker_id, target_roles)

        return result

    except Exception as e:
        logger.error(f"Skill gap analysis error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/resources")
async def get_learning_resources(category: str = "general"):
    """Get learning resources by category"""
    try:
        resources = {
            "general": [
                "LinkedIn Learning",
                "Coursera",
                "Udemy",
                "edX"
            ],
            "technical": [
                "freeCodeCamp",
                "MDN Web Docs",
                "GitHub",
                "Stack Overflow"
            ],
            "leadership": [
                "Harvard Business Review",
                "TED Talks",
                "Toastmasters",
                "Industry conferences"
            ]
        }

        return {
            "category": category,
            "resources": resources.get(category, resources["general"])
        }

    except Exception as e:
        logger.error(f"Resources error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/feedback")
async def submit_feedback(feedback: Dict[str, Any]):
    """Submit user feedback for model improvement"""
    try:
        logger.info("Received feedback", feedback)

        # Store feedback for model improvement
        # This would be saved to database in production

        return {
            "status": "received",
            "message": "Thank you for your feedback!"
        }

    except Exception as e:
        logger.error(f"Feedback submission error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=config.CAREER_COACH_PORT,
        reload=True,
        log_level="info"
    )