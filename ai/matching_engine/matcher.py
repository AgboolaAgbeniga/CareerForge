"""
Job-Candidate Matching Engine
"""
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from ai.shared.config import config
from ai.shared.utils import get_logger, timing_decorator, safe_model_call, validate_text_input

logger = get_logger(__name__)

@dataclass
class MatchResult:
    """Result of job-candidate matching"""
    score: float
    semantic_similarity: float
    skill_match: float
    experience_match: float
    reasons: List[str]
    job_id: int
    candidate_id: int

@dataclass
class CandidateAnalysis:
    """Analysis result for candidate-job fit"""
    candidate_id: int
    job_id: int
    overall_score: float
    skill_alignment: float
    experience_fit: float
    cultural_fit: float
    recommendations: List[str]

class JobMatcher:
    """AI-powered job-candidate matching engine"""

    def __init__(self):
        logger.info("Initializing Job Matcher...")

        # Initialize sentence transformer for semantic similarity
        self.embedder = safe_model_call(
            lambda: SentenceTransformer(config.EMBEDDING_MODEL),
            fallback=None
        )

        # Predefined skill categories for better matching
        self.skill_categories = {
            'technical': ['python', 'javascript', 'java', 'c++', 'react', 'node.js', 'sql', 'aws', 'docker'],
            'soft': ['communication', 'leadership', 'project management', 'agile', 'scrum'],
            'domain': ['machine learning', 'data science', 'ai', 'nlp', 'computer vision']
        }

        logger.info("Job Matcher initialized successfully")

    @timing_decorator
    def calculate_match_score(self, job_seeker: Dict[str, Any], job: Dict[str, Any]) -> MatchResult:
        """Calculate comprehensive match score between job seeker and job"""
        try:
            # Create comprehensive text representations
            js_text = self._create_job_seeker_text(job_seeker)
            job_text = self._create_job_text(job)

            # Generate embeddings and calculate semantic similarity
            semantic_score = self._calculate_semantic_similarity(js_text, job_text)

            # Calculate skill match
            skill_score = self._calculate_skill_match(job_seeker.get('skills', []), job.get('requirements', []))

            # Calculate experience match
            experience_score = self._calculate_experience_match(job_seeker, job)

            # Calculate overall score (weighted average)
            overall_score = (
                semantic_score * 0.4 +  # 40% semantic understanding
                skill_score * 0.4 +     # 40% skill alignment
                experience_score * 0.2  # 20% experience fit
            )

            # Generate reasoning
            reasons = self._generate_match_reasons(job_seeker, job, semantic_score, skill_score, experience_score)

            return MatchResult(
                score=round(overall_score, 3),
                semantic_similarity=round(semantic_score, 3),
                skill_match=round(skill_score, 3),
                experience_match=round(experience_score, 3),
                reasons=reasons,
                job_id=job.get('id', 0),
                candidate_id=job_seeker.get('id', 0)
            )

        except Exception as e:
            logger.error(f"Error calculating match score: {e}")
            return MatchResult(
                score=0.0,
                semantic_similarity=0.0,
                skill_match=0.0,
                experience_match=0.0,
                reasons=["Error calculating match"],
                job_id=job.get('id', 0),
                candidate_id=job_seeker.get('id', 0)
            )

    def _create_job_seeker_text(self, job_seeker: Dict[str, Any]) -> str:
        """Create comprehensive text representation of job seeker"""
        parts = []

        # Basic info
        if job_seeker.get('title'):
            parts.append(f"Job title: {job_seeker['title']}")

        # Skills
        skills = job_seeker.get('skills', [])
        if skills:
            parts.append(f"Skills: {', '.join(skills)}")

        # Experience
        experience = job_seeker.get('experience_years', 0)
        if experience:
            parts.append(f"Experience: {experience} years")

        # Education
        education = job_seeker.get('education', '')
        if education:
            parts.append(f"Education: {education}")

        # Summary/Profile
        summary = job_seeker.get('summary', '')
        if summary:
            parts.append(f"Profile: {summary}")

        return '. '.join(parts)

    def _create_job_text(self, job: Dict[str, Any]) -> str:
        """Create comprehensive text representation of job"""
        parts = []

        # Basic info
        if job.get('title'):
            parts.append(f"Job title: {job['title']}")

        # Description
        description = job.get('description', '')
        if description:
            parts.append(f"Description: {description}")

        # Requirements
        requirements = job.get('requirements', '')
        if requirements:
            parts.append(f"Requirements: {requirements}")

        # Skills
        skills = job.get('skills_required', [])
        if skills:
            parts.append(f"Required skills: {', '.join(skills)}")

        # Experience level
        level = job.get('experience_level', '')
        if level:
            parts.append(f"Experience level: {level}")

        return '. '.join(parts)

    def _calculate_semantic_similarity(self, text1: str, text2: str) -> float:
        """Calculate semantic similarity using sentence transformers"""
        if not self.embedder:
            return 0.0

        try:
            # Generate embeddings
            embeddings = self.embedder.encode([text1, text2])

            # Calculate cosine similarity
            similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

            return float(similarity)

        except Exception as e:
            logger.error(f"Error calculating semantic similarity: {e}")
            return 0.0

    def _calculate_skill_match(self, candidate_skills: List[str], job_requirements: List[str]) -> float:
        """Calculate skill match score"""
        if not candidate_skills or not job_requirements:
            return 0.0

        candidate_skills_lower = [skill.lower() for skill in candidate_skills]
        job_requirements_lower = [req.lower() for req in job_requirements]

        # Direct matches
        direct_matches = set(candidate_skills_lower) & set(job_requirements_lower)
        direct_score = len(direct_matches) / len(job_requirements_lower) if job_requirements_lower else 0

        # Semantic matches using embeddings
        if self.embedder:
            try:
                # Create skill embeddings
                all_skills = list(set(candidate_skills_lower + job_requirements_lower))
                embeddings = self.embedder.encode(all_skills)

                semantic_matches = 0
                for job_skill in job_requirements_lower:
                    if job_skill in candidate_skills_lower:
                        continue  # Already counted in direct matches

                    job_idx = all_skills.index(job_skill)
                    similarities = cosine_similarity([embeddings[job_idx]], embeddings)[0]

                    # Find best match above threshold
                    best_match_idx = np.argmax(similarities)
                    if similarities[best_match_idx] > 0.8 and all_skills[best_match_idx] in candidate_skills_lower:
                        semantic_matches += 1

                semantic_score = semantic_matches / len(job_requirements_lower) if job_requirements_lower else 0

                return min(1.0, direct_score + semantic_score)

            except Exception as e:
                logger.error(f"Error in semantic skill matching: {e}")

        return direct_score

    def _calculate_experience_match(self, job_seeker: Dict[str, Any], job: Dict[str, Any]) -> float:
        """Calculate experience match score"""
        candidate_exp = job_seeker.get('experience_years', 0)
        job_level = job.get('experience_level', 'entry')

        # Map experience levels to years
        level_mapping = {
            'entry': (0, 2),
            'mid': (2, 5),
            'senior': (5, 10),
            'executive': (10, 20)
        }

        required_range = level_mapping.get(job_level, (0, 2))

        if required_range[0] <= candidate_exp <= required_range[1]:
            return 1.0
        elif candidate_exp < required_range[0]:
            # Under-experienced
            return max(0.0, candidate_exp / required_range[0])
        else:
            # Over-experienced (still good, but slightly lower score)
            return max(0.7, 1.0 - (candidate_exp - required_range[1]) / 10)

    def _generate_match_reasons(self, job_seeker: Dict[str, Any], job: Dict[str, Any],
                               semantic_score: float, skill_score: float, experience_score: float) -> List[str]:
        """Generate human-readable reasons for the match"""
        reasons = []

        # Skill-based reasons
        candidate_skills = set(job_seeker.get('skills', []))
        job_skills = set(job.get('skills_required', []))

        matching_skills = candidate_skills & job_skills
        if matching_skills:
            reasons.append(f"Strong skill match: {', '.join(list(matching_skills)[:3])}")

        missing_skills = job_skills - candidate_skills
        if missing_skills:
            reasons.append(f"Could benefit from: {', '.join(list(missing_skills)[:2])}")

        # Experience reasons
        candidate_exp = job_seeker.get('experience_years', 0)
        job_level = job.get('experience_level', 'entry')

        if experience_score > 0.8:
            reasons.append(f"Experience level matches: {candidate_exp} years for {job_level} role")
        elif experience_score < 0.5:
            reasons.append(f"Experience gap: {candidate_exp} years vs required for {job_level}")

        # Semantic reasons
        if semantic_score > 0.7:
            reasons.append("Profile aligns well with job description")
        elif semantic_score < 0.4:
            reasons.append("Profile may not align closely with job requirements")

        return reasons[:4]  # Limit to top 4 reasons

    def find_best_matches(self, job_seeker: Dict[str, Any], jobs: List[Dict[str, Any]], top_k: int = 10) -> List[MatchResult]:
        """Find best job matches for a job seeker"""
        matches = []

        for job in jobs:
            match = self.calculate_match_score(job_seeker, job)
            matches.append(match)

        # Sort by score descending
        matches.sort(key=lambda x: x.score, reverse=True)

        return matches[:top_k]

    def analyze_candidates_for_job(self, job: Dict[str, Any], candidates: List[Dict[str, Any]]) -> List[CandidateAnalysis]:
        """Analyze multiple candidates for a job posting"""
        analyses = []

        for candidate in candidates:
            match = self.calculate_match_score(candidate, job)

            analysis = CandidateAnalysis(
                candidate_id=candidate.get('id', 0),
                job_id=job.get('id', 0),
                overall_score=match.score,
                skill_alignment=match.skill_match,
                experience_fit=match.experience_match,
                cultural_fit=self._estimate_cultural_fit(candidate, job),
                recommendations=self._generate_candidate_recommendations(match)
            )

            analyses.append(analysis)

        # Sort by overall score
        analyses.sort(key=lambda x: x.overall_score, reverse=True)

        return analyses

    def _estimate_cultural_fit(self, candidate: Dict[str, Any], job: Dict[str, Any]) -> float:
        """Estimate cultural fit (simplified)"""
        # This would use more sophisticated analysis in production
        # For now, return a random score based on profile completeness
        completeness = sum([
            1 if candidate.get('summary') else 0,
            1 if candidate.get('skills') else 0,
            1 if candidate.get('experience_years', 0) > 0 else 0
        ]) / 3

        return round(completeness, 2)

    def _generate_candidate_recommendations(self, match: MatchResult) -> List[str]:
        """Generate recommendations for candidates"""
        recommendations = []

        if match.skill_match < 0.6:
            recommendations.append("Consider upskilling in key required technologies")

        if match.experience_match < 0.7:
            recommendations.append("Gain more experience in this domain")

        if match.score > 0.8:
            recommendations.append("Strong candidate - prioritize for interview")

        return recommendations

    def get_hiring_suggestions(self, job_draft: Dict[str, Any]) -> Dict[str, Any]:
        """Provide AI suggestions for job posting improvements"""
        suggestions = {
            "title_suggestions": [],
            "description_improvements": [],
            "skill_recommendations": [],
            "salary_range": "Based on market data: $X-$Y"
        }

        # This would use NLP models to analyze and suggest improvements
        # For now, return basic suggestions
        return suggestions