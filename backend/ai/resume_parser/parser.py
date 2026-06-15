"""
Resume Parser using NVIDIA NIM (Llama 3) with HF fallback.
"""
import sys
import os
from typing import Dict, List, Any, Optional

# Add shared modules to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.config import config
from shared.utils import get_logger, timing_decorator, validate_text_input
from shared.nvidia_client import nvidia_client
from shared.prompt_templates import prompts

logger = get_logger(__name__)

class ResumeParser:
    """Resume parsing service using AI inference"""

    def __init__(self):
        logger.info("Initializing AI Resume Parser...")

    @timing_decorator
    async def parse_resume(self, text: str, image_path: Optional[str] = None) -> Dict[str, Any]:
        """Parse resume text and return structured data using AI"""
        try:
            validate_text_input(text)

            prompt = prompts.RESUME_PARSE_USER.format(resume_text=text)
            
            # Use generate_structured to guarantee JSON output
            result = await nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.RESUME_PARSE_SYSTEM,
                temperature=0.1,  # Low temperature for extraction accuracy
            )

            # Ensure minimal structure exists if AI missed something
            return {
                "personal_info": {
                    "name": result.get("name", ""),
                },
                "contact": {
                    "email": result.get("email", ""),
                    "phone": result.get("phone", ""),
                    "location": result.get("location", ""),
                },
                "skills": [{"skill": s, "confidence": 0.9} for s in result.get("skills", [])],
                "experience": result.get("experience", []),
                "education": result.get("education", []),
                "summary": result.get("summary", ""),
                "certifications": result.get("certifications", []),
                "languages": result.get("languages", []),
                "confidence_score": 0.85 if result.get("name") else 0.5
            }

        except Exception as e:
            logger.error(f"Error parsing resume: {e}")
            return {"error": str(e), "confidence_score": 0.0}

    async def optimize_resume(self, resume_data: Dict, job_requirements: Dict) -> Dict[str, Any]:
        """Optimize resume for specific job"""
        # Could use AI here too, but stubbing for now to match original interface
        return {
            "optimized_content": resume_data,
            "suggestions": [
                "Add more keywords from job description",
                "Quantify achievements with metrics",
                "Tailor summary to job requirements"
            ],
            "ats_score": 75  # Mock score
        }