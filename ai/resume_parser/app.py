"""
FastAPI application for Resume Parser service
"""
import asyncio
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from ai.resume_parser.parser import ResumeParser
from ai.shared.config import config
from ai.shared.utils import get_logger

logger = get_logger(__name__)

# Global parser instance
parser: ResumeParser = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global parser
    logger.info("Starting Resume Parser service...")

    # Initialize parser
    parser = ResumeParser()

    yield

    logger.info("Shutting down Resume Parser service...")

app = FastAPI(
    title="Resume Parser API",
    description="AI-powered resume parsing using Hugging Face models",
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

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "resume-parser"}

@app.post("/parse", response_model=ParseResponse)
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

@app.post("/parse-file")
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

@app.post("/optimize")
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

@app.get("/skills")
async def get_skill_suggestions(query: str = ""):
    """Get skill suggestions based on query"""
    try:
        # This would use the skill extraction logic
        return {"suggestions": [], "query": query}
    except Exception as e:
        logger.error(f"Skills error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=config.RESUME_PARSER_PORT,
        reload=True,
        log_level="info"
    )