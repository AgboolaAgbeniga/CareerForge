"""
Resume Parser using Hugging Face models
"""
import re
import sys
import os
from typing import Dict, List, Any, Optional
from pathlib import Path

from transformers import pipeline
from sentence_transformers import SentenceTransformer
import layoutparser as lp
from PIL import Image

# Add shared modules to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.config import config
from shared.utils import get_logger, timing_decorator, safe_model_call, validate_text_input

logger = get_logger(__name__)

class ResumeParser:
    """Resume parsing service using Hugging Face models"""

    def __init__(self):
        logger.info("Initializing Resume Parser...")

        # Ensure cache dir exists
        try:
            os.makedirs(config.CACHE_DIR, exist_ok=True)
        except Exception:
            pass

        # Initialize models (use cache_dir/cache_folder to prefer local cache)
        self.ner_pipeline = safe_model_call(
            lambda: pipeline("ner", model=config.NER_MODEL, aggregation_strategy="simple", cache_dir=config.CACHE_DIR),
            fallback=None
        )

        self.embedder = safe_model_call(
            lambda: SentenceTransformer(config.EMBEDDING_MODEL, cache_folder=config.CACHE_DIR),
            fallback=None
        )

        # Layout parser (optional, for image-based resumes)
        try:
            self.layout_model = lp.Detectron2LayoutModel('lp://efficientdet')
        except Exception as e:
            logger.warning(f"Layout parser not available: {e}")
            self.layout_model = None

        # Skill database for matching
        self.skill_database = self._load_skill_database()

        logger.info("Resume Parser initialized successfully")

    def _load_skill_database(self) -> List[str]:
        """Load predefined skill database"""
        return [
            "JavaScript", "Python", "Java", "C++", "React", "Node.js",
            "SQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Git",
            "Machine Learning", "Data Science", "AI", "NLP", "Computer Vision",
            "Project Management", "Agile", "Scrum", "Leadership", "Communication"
        ]

    @timing_decorator
    def parse_resume(self, text: str, image_path: Optional[str] = None) -> Dict[str, Any]:
        """Parse resume text and return structured data"""
        try:
            validate_text_input(text)

            result = {
                "personal_info": {},
                "skills": [],
                "experience": [],
                "education": [],
                "contact": {},
                "summary": "",
                "confidence_score": 0.0
            }

            # Extract named entities
            if self.ner_pipeline:
                entities = self.ner_pipeline(text)
                result["personal_info"] = self._extract_personal_info(entities)
                result["contact"] = self._extract_contact_info(text)

            # Extract skills
            if self.embedder:
                result["skills"] = self._extract_skills(text)

            # Extract experience and education
            result["experience"] = self._extract_experience(text)
            result["education"] = self._extract_education(text)

            # Generate summary
            result["summary"] = self._generate_summary(text)

            # Calculate confidence score
            result["confidence_score"] = self._calculate_confidence(result)

            return result

        except Exception as e:
            logger.error(f"Error parsing resume: {e}")
            return {"error": str(e), "confidence_score": 0.0}

    def _extract_personal_info(self, entities: List[Dict]) -> Dict[str, str]:
        """Extract personal information from NER entities"""
        info = {}
        for entity in entities:
            if entity["entity_group"] == "PERSON" and "name" not in info:
                info["name"] = entity["word"]
            elif entity["entity_group"] == "ORG":
                # Could be company or university
                pass
        return info

    def _extract_contact_info(self, text: str) -> Dict[str, str]:
        """Extract contact information using regex"""
        contact = {}

        # Email pattern
        email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
        if email_match:
            contact["email"] = email_match.group()

        # Phone pattern
        phone_match = re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', text)
        if phone_match:
            contact["phone"] = phone_match.group()

        return contact

    def _extract_skills(self, text: str) -> List[Dict[str, Any]]:
        """Extract skills using semantic similarity"""
        if not self.embedder:
            return []

        # Create embeddings
        skill_embeddings = self.embedder.encode(self.skill_database)
        text_embedding = self.embedder.encode([text])

        # Calculate similarities
        from sklearn.metrics.pairwise import cosine_similarity
        similarities = cosine_similarity(text_embedding, skill_embeddings)[0]

        # Filter skills above threshold
        skills = []
        for skill, similarity in zip(self.skill_database, similarities):
            if similarity > 0.7:  # Confidence threshold
                skills.append({
                    "skill": skill,
                    "confidence": float(similarity)
                })

        return sorted(skills, key=lambda x: x["confidence"], reverse=True)[:10]

    def _extract_experience(self, text: str) -> List[Dict[str, str]]:
        """Extract work experience (basic regex-based)"""
        experience = []

        # Look for common experience patterns
        exp_patterns = [
            r'(\d{4})\s*-\s*(\d{4}|Present|Current).*?([A-Z][^.\n]*)',
            r'([A-Z][^.\n]*).*?(\d{4})\s*-\s*(\d{4}|Present|Current)'
        ]

        for pattern in exp_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                if len(match) >= 3:
                    experience.append({
                        "company": match[2] if len(match) > 2 else match[0],
                        "start_date": match[0],
                        "end_date": match[1],
                        "description": ""
                    })

        return experience[:5]  # Limit to top 5

    def _extract_education(self, text: str) -> List[Dict[str, str]]:
        """Extract education information"""
        education = []

        # Common degree patterns
        degree_patterns = [
            r'(Bachelor|Master|PhD|Doctorate|Associate|B\.S\.|M\.S\.|MBA).*?([A-Z][^.\n]*)',
            r'([A-Z][^.\n]*University|College).*?(\d{4})'
        ]

        for pattern in degree_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                education.append({
                    "degree": match[0] if "University" not in match[0] else "",
                    "institution": match[1] if len(match) > 1 else match[0],
                    "year": match[1] if len(match) > 1 and match[1].isdigit() else ""
                })

        return education[:3]

    def _generate_summary(self, text: str) -> str:
        """Generate a brief summary of the resume"""
        # Simple extractive summary
        sentences = re.split(r'[.!?]+', text)
        summary_sentences = []

        for sentence in sentences[:3]:  # First 3 sentences
            if len(sentence.strip()) > 20:
                summary_sentences.append(sentence.strip())

        return ' '.join(summary_sentences) if summary_sentences else "Professional with diverse experience."

    def _calculate_confidence(self, parsed_data: Dict) -> float:
        """Calculate overall parsing confidence"""
        scores = []

        if parsed_data.get("personal_info"):
            scores.append(0.3)
        if parsed_data.get("skills"):
            scores.append(0.3)
        if parsed_data.get("experience"):
            scores.append(0.2)
        if parsed_data.get("education"):
            scores.append(0.2)

        return sum(scores) if scores else 0.0

    def optimize_resume(self, resume_data: Dict, job_requirements: Dict) -> Dict[str, Any]:
        """Optimize resume for specific job"""
        # This would use more advanced models for optimization
        # For now, return basic suggestions
        return {
            "optimized_content": resume_data,
            "suggestions": [
                "Add more keywords from job description",
                "Quantify achievements with metrics",
                "Tailor summary to job requirements"
            ],
            "ats_score": 75  # Mock score
        }