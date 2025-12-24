"""
Resume Parser router for combined AI service
"""
from typing import Dict, Any

from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.utils import get_logger

logger = get_logger(__name__)

# Global parser instance
parser = None

# Router
resume_router = APIRouter()

# Pydantic models
class ParseRequest(BaseModel):
    text: str

class OptimizeRequest(BaseModel):
    resume_data: Dict[str, Any]
    job_requirements: Dict[str, Any]

class ParseResponse(BaseModel):
    personal_info: Dict[str, str]
    skills: list
    experience: list
    education: list
    contact: Dict[str, str]
    summary: str
    confidence_score: float

async def init_parser():
    """Initialize the resume parser"""
    global parser
    from parser import ResumeParser
    logger.info("Initializing Resume Parser...")
    parser = ResumeParser()

@resume_router.post("/resume/parse", response_model=ParseResponse)
async def parse_resume(request: ParseRequest):
    """Parse resume text"""
    try:
        if not parser:
            raise HTTPException(status_code=503, detail="Parser not initialized")

        result = parser.parse_resume(request.text)

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        return result

    except Exception as e:
        logger.error(f"Parse error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@resume_router.post("/resume/parse-file")
async def parse_resume_file(file: UploadFile = File(...)):
    """Parse uploaded resume file"""
    try:
        if not parser:
            raise HTTPException(status_code=503, detail="Parser not initialized")

        # Validate file type
        if not file.filename.lower().endswith(('.pdf', '.txt', '.docx')):
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Read file content
        content = await file.read()

        # For now, assume text content (would need PDF parsing library)
        text = content.decode('utf-8', errors='ignore')

        result = parser.parse_resume(text)

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        return result

    except Exception as e:
        logger.error(f"File parse error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@resume_router.post("/resume/optimize")
async def optimize_resume(request: OptimizeRequest):
    """Optimize resume for job application"""
    try:
        if not parser:
            raise HTTPException(status_code=503, detail="Parser not initialized")

        result = parser.optimize_resume(request.resume_data, request.job_requirements)
        return result

    except Exception as e:
        logger.error(f"Optimize error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@resume_router.post("/resume/cover-letter")
async def generate_cover_letter(data: dict):
    """Generate cover letter"""
    try:
        # Placeholder - would use career coach
        return {"content": "Generated cover letter", "key_points": [], "customization_notes": ""}
    except Exception as e:
        logger.error(f"Cover letter error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@resume_router.get("/resume/skills")
async def get_skill_suggestions(query: str = ""):
    """Get skill suggestions based on query"""
    try:
        # This would use the skill extraction logic
        return {"suggestions": [], "query": query}
    except Exception as e:
        logger.error(f"Skills error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")