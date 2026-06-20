"""
Career Coach AI Service using NVIDIA NIM
"""
import sys
import os
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.config import config
from shared.utils import get_logger, timing_decorator, validate_text_input
from shared.nvidia_client import nvidia_client
from shared.prompt_templates import prompts

logger = get_logger(__name__)

@dataclass
class CareerAdvice:
    """Career advice response"""
    advice: str
    action_items: List[str]
    resources: List[str]
    confidence_score: float

@dataclass
class LinkedInOptimization:
    """LinkedIn profile optimization"""
    optimized_headline: str
    suggestions: List[str]
    keywords_added: List[str]

@dataclass
class CoverLetter:
    """Generated cover letter"""
    content: str
    key_points: List[str]
    customization_notes: str

class CareerCoach:
    """AI-powered career coaching service using NVIDIA NIM"""

    def __init__(self):
        logger.info("Initializing AI Career Coach...")

    @timing_decorator
    async def provide_advice(self, user_profile: Dict[str, Any], context: str) -> CareerAdvice:
        """Provide personalized career advice using LLM"""
        try:
            validate_text_input(context)
            
            prompt = prompts.CAREER_ADVICE_USER.format(
                user_context=str(user_profile),
                question=context
            )

            result = await nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.CAREER_ADVICE_SYSTEM,
                temperature=0.7
            )

            return CareerAdvice(
                advice=result.get("advice", "Focus on continuous learning."),
                action_items=result.get("action_items", ["Update resume", "Network"]),
                resources=result.get("resources", []),
                confidence_score=result.get("confidence_score", 0.8)
            )

        except Exception as e:
            logger.error(f"Error providing advice: {e}")
            return CareerAdvice(
                advice="Focus on continuous learning and building relevant experience in your field.",
                action_items=["Update your resume", "Network with professionals"],
                resources=["LinkedIn Learning", "Industry conferences"],
                confidence_score=0.5
            )

    @timing_decorator
    async def optimize_linkedin_profile(self, current_headline: str, target_role: str) -> LinkedInOptimization:
        """Optimize LinkedIn headline for target role using LLM"""
        try:
            validate_text_input(current_headline)
            validate_text_input(target_role)

            prompt = prompts.LINKEDIN_OPTIMIZE_USER.format(
                current_headline=current_headline,
                target_role=target_role
            )

            result = await nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.LINKEDIN_OPTIMIZE_SYSTEM,
                temperature=0.8
            )

            return LinkedInOptimization(
                optimized_headline=result.get("optimized_headline", current_headline),
                suggestions=result.get("profile_tips", []),
                keywords_added=result.get("keyword_suggestions", [])
            )

        except Exception as e:
            logger.error(f"LinkedIn optimization failed: {e}")
            return LinkedInOptimization(
                optimized_headline=f"{target_role} | {current_headline}",
                suggestions=["Add relevant keywords", "Include quantifiable achievements"],
                keywords_added=[target_role]
            )

    @timing_decorator
    async def generate_cover_letter(self, job_id: int, resume_data: Dict[str, Any]) -> CoverLetter:
        """Generate personalized cover letter using LLM"""
        try:
            # Mock job data (would come from database based on job_id)
            job = {
                "title": "Software Engineer",
                "company": "Tech Corp",
                "description": "Looking for a strong software engineer.",
                "requirements": "Python, React, teamwork"
            }

            prompt = prompts.COVER_LETTER_USER.format(
                candidate_profile=str(resume_data),
                job_description=str(job)
            )

            result = await nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.COVER_LETTER_SYSTEM,
                temperature=0.7
            )

            return CoverLetter(
                content=result.get("cover_letter", "Dear Hiring Manager..."),
                key_points=result.get("key_matches", []),
                customization_notes="\n".join(result.get("customization_tips", []))
            )

        except Exception as e:
            logger.error(f"Cover letter generation failed: {e}")
            return CoverLetter(
                content="Dear Hiring Manager,\n\nI am excited to apply. Thank you.\n\nBest regards,",
                key_points=["Express enthusiasm", "Call to action"],
                customization_notes="Replace placeholders and add specific examples"
            )

    async def analyze_skill_gaps(self, job_seeker_id: int, target_roles: List[str]) -> Dict[str, Any]:
        """Analyze skill gaps for target roles using LLM"""
        try:
            # Mock user skills
            current_skills = "Python, SQL"
            experience_years = 2
            current_title = "Junior Developer"

            prompt = prompts.SKILL_GAP_USER.format(
                current_skills=current_skills,
                experience_years=experience_years,
                current_title=current_title,
                target_roles=", ".join(target_roles)
            )

            result = await nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.SKILL_GAP_SYSTEM,
                temperature=0.3
            )
            return result
        except Exception as e:
            logger.error(f"Skill gap analysis failed: {e}")
            return {
                "gaps": [],
                "time_estimate": "Unknown",
                "resources": []
            }

    @timing_decorator
    async def generate_cover_letter_document(self, cover_letter_content: str, candidate_info: Dict[str, Any], job_info: Dict[str, Any] = None) -> bytes:
        """Generate a professionally formatted DOCX cover letter file."""
        try:
            from career_coach.document_generator import generate_cover_letter_docx
            return generate_cover_letter_docx(cover_letter_content, candidate_info, job_info)
        except Exception as e:
            logger.error(f"Error generating cover letter DOCX: {e}")
            raise e

    @timing_decorator
    async def generate_resume_document(self, parsed_data: Dict[str, Any], optimizations: Dict[str, Any] = None) -> bytes:
        """Generate a formatted DOCX resume file."""
        try:
            from career_coach.document_generator import generate_optimized_resume_docx
            return generate_optimized_resume_docx(parsed_data, optimizations)
        except Exception as e:
            logger.error(f"Error generating resume DOCX: {e}")
            raise e