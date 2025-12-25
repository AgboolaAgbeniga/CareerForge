"""
Career Coach AI Service
"""
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

from transformers import pipeline

from ai.shared.config import config
from ai.shared.utils import get_logger, timing_decorator, safe_model_call, validate_text_input

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
    """AI-powered career coaching service"""

    def __init__(self):
        logger.info("Initializing Career Coach...")

        # Ensure cache dir exists
        try:
            os.makedirs(config.CACHE_DIR, exist_ok=True)
        except Exception:
            pass

        # Initialize text generation model (prefer local cache)
        self.generator = safe_model_call(
            lambda: pipeline("text2text-generation", model=config.GENERATION_MODEL, cache_dir=config.CACHE_DIR),
            fallback=None
        )

        # Initialize sentence embedder for context understanding
        try:
            from sentence_transformers import SentenceTransformer
            self.embedder = SentenceTransformer(config.EMBEDDING_MODEL, cache_folder=config.CACHE_DIR)
        except Exception as e:
            logger.warning(f"Embedder not available: {e}")
            self.embedder = None

        # Career advice templates
        self.advice_templates = self._load_advice_templates()

        logger.info("Career Coach initialized successfully")

    def _load_advice_templates(self) -> Dict[str, str]:
        """Load predefined advice templates"""
        return {
            "skill_gap": "Focus on building {skill} skills through online courses and projects.",
            "networking": "Expand your professional network by attending industry events and joining relevant communities.",
            "experience": "Gain practical experience through internships, freelance projects, or contributing to open source.",
            "resume": "Tailor your resume to highlight relevant experience and quantify your achievements.",
            "interview": "Prepare for interviews by practicing common questions and researching the company."
        }

    @timing_decorator
    def provide_advice(self, user_profile: Dict[str, Any], context: str) -> CareerAdvice:
        """Provide personalized career advice"""
        try:
            validate_text_input(context)

            # Analyze user situation
            analysis = self._analyze_user_situation(user_profile, context)

            # Generate advice based on analysis
            advice_text = self._generate_advice_text(analysis, context)

            # Generate action items
            action_items = self._generate_action_items(analysis)

            # Recommend resources
            resources = self._recommend_resources(analysis)

            # Calculate confidence
            confidence = self._calculate_advice_confidence(analysis)

            return CareerAdvice(
                advice=advice_text,
                action_items=action_items,
                resources=resources,
                confidence_score=confidence
            )

        except Exception as e:
            logger.error(f"Error providing advice: {e}")
            return CareerAdvice(
                advice="Focus on continuous learning and building relevant experience in your field.",
                action_items=["Update your resume", "Network with professionals"],
                resources=["LinkedIn Learning", "Industry conferences"],
                confidence_score=0.5
            )

    def _analyze_user_situation(self, user_profile: Dict[str, Any], context: str) -> Dict[str, Any]:
        """Analyze user's career situation"""
        analysis = {
            "experience_level": "entry",
            "skill_gaps": [],
            "strengths": [],
            "opportunities": [],
            "challenges": [],
            "goals": []
        }

        # Determine experience level
        experience_years = user_profile.get('experience_years', 0)
        if experience_years < 2:
            analysis["experience_level"] = "entry"
        elif experience_years < 5:
            analysis["experience_level"] = "mid"
        else:
            analysis["experience_level"] = "senior"

        # Extract skills and identify gaps
        user_skills = set(user_profile.get('skills', []))
        common_skills = {"communication", "leadership", "project management", "problem solving"}

        analysis["skill_gaps"] = list(common_skills - user_skills)
        analysis["strengths"] = list(user_skills & common_skills)

        # Analyze context for specific needs
        context_lower = context.lower()
        if "job" in context_lower or "career" in context_lower:
            analysis["goals"].append("career_advance")
        if "skill" in context_lower:
            analysis["challenges"].append("skill_development")
        if "network" in context_lower:
            analysis["opportunities"].append("networking")

        return analysis

    def _generate_advice_text(self, analysis: Dict[str, Any], context: str) -> str:
        """Generate personalized advice text"""
        if not self.generator:
            return self._fallback_advice(analysis)

        try:
            # Create prompt for the model
            prompt = self._create_advice_prompt(analysis, context)

            # Generate advice
            result = self.generator(
                prompt,
                max_length=200,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True
            )

            advice = result[0]['generated_text'].strip()

            # Clean up the response
            if advice.startswith(prompt):
                advice = advice[len(prompt):].strip()

            return advice if len(advice) > 20 else self._fallback_advice(analysis)

        except Exception as e:
            logger.error(f"Advice generation failed: {e}")
            return self._fallback_advice(analysis)

    def _create_advice_prompt(self, analysis: Dict[str, Any], context: str) -> str:
        """Create prompt for advice generation"""
        experience_level = analysis.get("experience_level", "entry")
        skill_gaps = analysis.get("skill_gaps", [])
        strengths = analysis.get("strengths", [])

        prompt_parts = [
            f"Provide career advice for a {experience_level}-level professional who is asking: '{context}'"
        ]

        if strengths:
            prompt_parts.append(f"Their strengths include: {', '.join(strengths)}")

        if skill_gaps:
            prompt_parts.append(f"They could improve in: {', '.join(skill_gaps)}")

        prompt_parts.append("Give specific, actionable advice in 2-3 sentences.")

        return " ".join(prompt_parts)

    def _fallback_advice(self, analysis: Dict[str, Any]) -> str:
        """Provide fallback advice when model fails"""
        experience_level = analysis.get("experience_level", "entry")

        advice_map = {
            "entry": "Focus on building a strong foundation through learning and gaining practical experience.",
            "mid": "Consider specializing in a niche area while continuing to develop leadership skills.",
            "senior": "Mentor others while exploring strategic roles or entrepreneurship opportunities."
        }

        return advice_map.get(experience_level, "Continue developing your skills and network in your industry.")

    def _generate_action_items(self, analysis: Dict[str, Any]) -> List[str]:
        """Generate actionable items based on analysis"""
        items = []

        skill_gaps = analysis.get("skill_gaps", [])
        if skill_gaps:
            items.append(f"Develop skills in: {', '.join(skill_gaps[:2])}")

        if "networking" in analysis.get("opportunities", []):
            items.append("Attend industry events and join professional communities")

        if analysis.get("experience_level") == "entry":
            items.append("Seek mentorship and take on challenging projects")

        items.extend([
            "Update your resume and LinkedIn profile",
            "Set specific career goals for the next 6 months"
        ])

        return items[:4]

    def _recommend_resources(self, analysis: Dict[str, Any]) -> List[str]:
        """Recommend learning resources"""
        resources = []

        skill_gaps = analysis.get("skill_gaps", [])
        if "communication" in skill_gaps:
            resources.append("Toastmasters International")

        if "leadership" in skill_gaps:
            resources.append("Harvard Business Review Leadership Articles")

        # General resources
        resources.extend([
            "LinkedIn Learning",
            "Coursera",
            "Industry-specific conferences",
            "Professional networking events"
        ])

        return resources[:4]

    def _calculate_advice_confidence(self, analysis: Dict[str, Any]) -> float:
        """Calculate confidence score for advice"""
        confidence = 0.5  # Base confidence

        # Increase based on analysis completeness
        if analysis.get("strengths"):
            confidence += 0.1
        if analysis.get("skill_gaps"):
            confidence += 0.1
        if analysis.get("goals"):
            confidence += 0.1

        # Increase if model is available
        if self.generator:
            confidence += 0.2

        return min(confidence, 1.0)

    @timing_decorator
    def optimize_linkedin_profile(self, current_headline: str, target_role: str) -> LinkedInOptimization:
        """Optimize LinkedIn headline for target role"""
        try:
            validate_text_input(current_headline)
            validate_text_input(target_role)

            if not self.generator:
                return self._fallback_linkedin_optimization(current_headline, target_role)

            # Create optimization prompt
            prompt = f"Optimize this LinkedIn headline for a {target_role} position: '{current_headline}'. Make it compelling and keyword-rich."

            result = self.generator(
                prompt,
                max_length=100,
                num_return_sequences=1,
                temperature=0.8
            )

            optimized = result[0]['generated_text'].strip()

            # Extract keywords and suggestions
            keywords = self._extract_keywords(optimized, target_role)
            suggestions = self._generate_linkedin_suggestions(optimized, target_role)

            return LinkedInOptimization(
                optimized_headline=optimized,
                suggestions=suggestions,
                keywords_added=keywords
            )

        except Exception as e:
            logger.error(f"LinkedIn optimization failed: {e}")
            return self._fallback_linkedin_optimization(current_headline, target_role)

    def _fallback_linkedin_optimization(self, current: str, target: str) -> LinkedInOptimization:
        """Fallback LinkedIn optimization"""
        optimized = f"{target} | {current}"
        return LinkedInOptimization(
            optimized_headline=optimized,
            suggestions=["Add relevant keywords", "Include quantifiable achievements"],
            keywords_added=[target]
        )

    def _extract_keywords(self, text: str, target_role: str) -> List[str]:
        """Extract relevant keywords from optimized text"""
        # Simple keyword extraction (would use NLP in production)
        target_keywords = target_role.lower().split()
        text_lower = text.lower()

        found_keywords = []
        for keyword in target_keywords:
            if keyword in text_lower:
                found_keywords.append(keyword.title())

        return found_keywords

    def _generate_linkedin_suggestions(self, optimized: str, target: str) -> List[str]:
        """Generate suggestions for LinkedIn profile"""
        return [
            "Include industry-specific keywords",
            "Add metrics and achievements",
            "Keep it under 220 characters",
            f"Target {target} opportunities"
        ]

    @timing_decorator
    def generate_cover_letter(self, job_id: int, resume_data: Dict[str, Any]) -> CoverLetter:
        """Generate personalized cover letter"""
        try:
            if not self.generator:
                return self._fallback_cover_letter()

            # Mock job data (would come from database)
            job = {
                "title": "Software Engineer",
                "company": "Tech Corp",
                "requirements": "Python, React, teamwork"
            }

            prompt = f"Write a professional cover letter for a {job['title']} position at {job['company']}. The candidate has experience with {', '.join(resume_data.get('skills', [])[:3])}. Keep it concise and compelling."

            result = self.generator(
                prompt,
                max_length=400,
                num_return_sequences=1,
                temperature=0.7
            )

            content = result[0]['generated_text'].strip()

            return CoverLetter(
                content=content,
                key_points=self._extract_cover_letter_points(content),
                customization_notes="Personalize with specific company research and tailor to job requirements"
            )

        except Exception as e:
            logger.error(f"Cover letter generation failed: {e}")
            return self._fallback_cover_letter()

    def _fallback_cover_letter(self) -> CoverLetter:
        """Fallback cover letter"""
        content = """Dear Hiring Manager,

I am excited to apply for the Software Engineer position. With my background in software development and passion for creating innovative solutions, I am confident in my ability to contribute to your team.

Thank you for considering my application.

Best regards,
[Your Name]"""

        return CoverLetter(
            content=content,
            key_points=["Express enthusiasm", "Highlight relevant experience", "Call to action"],
            customization_notes="Replace placeholders and add specific examples"
        )

    def _extract_cover_letter_points(self, content: str) -> List[str]:
        """Extract key points from cover letter"""
        return [
            "Express genuine interest in the company",
            "Highlight relevant skills and experience",
            "Explain why you're a good fit",
            "Include a call to action"
        ]

    def analyze_skill_gaps(self, job_seeker_id: int, target_roles: List[str]) -> Dict[str, Any]:
        """Analyze skill gaps for target roles"""
        # Mock implementation
        return {
            "gaps": [
                {
                    "skill": "Advanced Python",
                    "current_level": "Intermediate",
                    "required_level": "Expert",
                    "recommendations": ["Take advanced Python course", "Build complex projects"]
                }
            ],
            "time_estimate": "6 months",
            "resources": ["Coursera", "Udemy", "LeetCode"]
        }