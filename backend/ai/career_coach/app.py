"""
Career Coach router for combined AI service
"""
from typing import List, Dict, Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.utils import get_logger

logger = get_logger(__name__)

from .session_manager import SessionManager

# Global coach and session manager instances
coach = None
session_manager = None
guided_builder = None

# Router
career_router = APIRouter()

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
    session_id: str = None  # Optional session ID

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

async def init_coach():
    """Initialize the career coach services"""
    global coach, session_manager, guided_builder
    from .coach import CareerCoach
    from .session_manager import SessionManager
    from .guided_builder import GuidedResumeBuilder
    logger.info("Initializing Career Coach & Session Manager...")
    coach = CareerCoach()
    session_manager = SessionManager()
    guided_builder = GuidedResumeBuilder()

@career_router.post("/career-coach/advice", response_model=AdviceResponse)
async def get_career_advice(data: dict):
    """Get personalized career advice with session context"""
    try:
        if not coach or not session_manager:
            raise HTTPException(status_code=503, detail="Service not initialized")

        # Extract data
        user_profile_data = data.get('userContext', {})
        user_profile = UserProfile(**user_profile_data)
        query = data.get('query', '')
        session_id = data.get('sessionId')

        # different handling if session_id is provided
        context_history = ""
        if session_id:
            # Add user query to history
            session_manager.add_message(session_id, "user", query)
            # Get historical context
            context_history = session_manager.get_context_string(session_id)
        
        # Combine query with history for "context" passed to the model
        # If history exists, prepend it. Otherwise just use query.
        full_context = f"{context_history}\nCurrent User Query: {query}" if context_history else query

        result = await coach.provide_advice(user_profile.dict(), full_context)

        # If session exists, store the advice response in history too
        if session_id:
            session_manager.add_message(session_id, "assistant", result.advice)

        return AdviceResponse(**result.__dict__)

    except Exception as e:
        logger.error(f"Advice error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/linkedin")
async def optimize_linkedin(data: dict):
    """Optimize LinkedIn profile headline"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        current_headline = data.get('currentHeadline', '')
        target_role = data.get('targetRole', '')

        result = await coach.optimize_linkedin_profile(current_headline, target_role)

        return result.__dict__

    except Exception as e:
        logger.error(f"LinkedIn optimization error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/resume/cover-letter")
async def generate_cover_letter(data: dict):
    """Generate personalized cover letter"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        job_id = data.get('jobId')
        resume_data = data.get('resumeData', {})

        result = await coach.generate_cover_letter(job_id, resume_data)

        return result.__dict__

    except Exception as e:
        logger.error(f"Cover letter generation error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/skill-gaps")
async def analyze_skill_gaps(data: dict):
    """Analyze skill gaps for target roles"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")

        user_id = data.get('userId')
        roles = data.get('roles', ["software engineer"])

        result = await coach.analyze_skill_gaps(user_id, roles)

        return result

    except Exception as e:
        logger.error(f"Skill gap analysis error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.get("/career-coach/resources")
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

@career_router.post("/career-coach/feedback")
async def submit_feedback(data: dict):
    """Submit user feedback for model improvement"""
    try:
        logger.info("Received feedback", data)

        # Store feedback for model improvement
        # This would be saved to database in production

        return {
            "status": "received",
            "message": "Thank you for your feedback!"
        }

    except Exception as e:
        logger.error(f"Feedback submission error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/cover-letter/download")
async def download_cover_letter(data: dict):
    """Generate and download cover letter as DOCX"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")
        content = data.get('content', '')
        candidate_info = data.get('candidateInfo', {})
        job_info = data.get('jobInfo')
        
        docx_bytes = await coach.generate_cover_letter_document(content, candidate_info, job_info)
        
        from fastapi import Response
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=CoverLetter.docx"}
        )
    except Exception as e:
        logger.error(f"Download cover letter error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/resume/download")
async def download_resume(data: dict):
    """Generate and download optimized resume as DOCX"""
    try:
        if not coach:
            raise HTTPException(status_code=503, detail="Coach not initialized")
        parsed_data = data.get('parsedData', {})
        optimizations = data.get('optimizations')
        
        docx_bytes = await coach.generate_resume_document(parsed_data, optimizations)
        
        from fastapi import Response
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=Resume.docx"}
        )
    except Exception as e:
        logger.error(f"Download resume error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/guided-builder/start")
async def start_guided_builder(data: dict):
    """Start a new guided resume builder session"""
    try:
        if not guided_builder:
            raise HTTPException(status_code=503, detail="Guided builder not initialized")
            
        user_id = data.get("userId")
        target_role = data.get("targetRole")
        experience_years = int(data.get("experienceYears", 0))
        key_achievements = data.get("keyAchievements", "")
        
        if not user_id or not target_role:
            raise HTTPException(status_code=400, detail="userId and targetRole are required")
            
        session = await guided_builder.create_session(user_id, target_role, experience_years, key_achievements)
        return {"success": True, "session": session}
    except Exception as e:
        logger.error(f"Start guided builder error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.post("/career-coach/guided-builder/respond")
async def respond_guided_builder(data: dict):
    """Process user response/feedback in the guided resume builder workflow"""
    try:
        if not guided_builder:
            raise HTTPException(status_code=503, detail="Guided builder not initialized")
            
        session_id = data.get("sessionId")
        stage = int(data.get("stage", 1))
        answer = data.get("answer") # Stage 1
        feedback = data.get("feedback") # Stage 2
        approve = data.get("approve", False) # Stage 2 / Stage 3
        
        if not session_id:
            raise HTTPException(status_code=400, detail="sessionId is required")
            
        if stage == 1:
            if not answer:
                raise HTTPException(status_code=400, detail="answer is required for stage 1")
            session = await guided_builder.stage_1_gather_context(session_id, answer)
        elif stage == 2:
            session = await guided_builder.stage_2_refine_sections(session_id, feedback, approve)
        elif stage == 3:
            session = await guided_builder.stage_3_reader_test(session_id, approve)
        else:
            raise HTTPException(status_code=400, detail="Invalid stage")
            
        return {"success": True, "session": session}
    except Exception as e:
        logger.error(f"Respond guided builder error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.get("/career-coach/guided-builder/session/{session_id}")
async def get_guided_builder_session(session_id: str):
    """Retrieve guided builder session state"""
    try:
        if not guided_builder:
            raise HTTPException(status_code=503, detail="Guided builder not initialized")
            
        session = await guided_builder.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return {"success": True, "session": session}
    except Exception as e:
        logger.error(f"Get guided builder session error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@career_router.get("/career-coach/guided-builder/sessions/{user_id}")
async def list_guided_builder_sessions(user_id: str):
    """List guided builder sessions for a user"""
    try:
        if not guided_builder:
            raise HTTPException(status_code=503, detail="Guided builder not initialized")
            
        sessions = await guided_builder.list_user_sessions(user_id)
        return {"success": True, "sessions": sessions}
    except Exception as e:
        logger.error(f"List guided builder sessions error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")