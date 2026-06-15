"""
Job-Candidate Matching Engine using NVIDIA NIM for embeddings and inference.
"""
import asyncio
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
import sys
import os

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.config import config
from shared.utils import get_logger, timing_decorator
from shared.nvidia_client import nvidia_client
from shared.prompt_templates import prompts

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
    """AI-powered job-candidate matching engine using NVIDIA NIM"""

    def __init__(self):
        logger.info("Initializing Job Matcher...")

    @timing_decorator
    async def calculate_match_score(self, job_seeker: Dict[str, Any], job: Dict[str, Any]) -> MatchResult:
        """Calculate comprehensive match score using LLM and embeddings"""
        try:
            # 1. Generate text representations
            js_text = self._create_job_seeker_text(job_seeker)
            job_text = self._create_job_text(job)

            # 2. Parallel Embedding and LLM evaluation
            prompt = prompts.JOB_MATCH_USER.format(
                candidate_skills=", ".join(job_seeker.get("skills", [])),
                experience_years=job_seeker.get("experience_years", 0),
                candidate_title=job_seeker.get("title", "Unknown"),
                education=job_seeker.get("education", "Unknown"),
                job_title=job.get("title", "Unknown"),
                required_skills=", ".join(job.get("skills_required", [])),
                experience_level=job.get("experience_level", "Unknown"),
                job_description=job.get("description", "Unknown")
            )

            # Run embedding and LLM generation concurrently
            js_emb_task = nvidia_client.generate_embedding(js_text)
            job_emb_task = nvidia_client.generate_embedding(job_text)
            llm_eval_task = nvidia_client.generate_structured(
                prompt=prompt,
                system_prompt=prompts.JOB_MATCH_SYSTEM,
                temperature=0.1
            )

            js_emb, job_emb, llm_eval = await asyncio.gather(js_emb_task, job_emb_task, llm_eval_task)

            # 3. Calculate semantic similarity from embeddings
            semantic_score = float(cosine_similarity([js_emb], [job_emb])[0][0])
            
            # Bound the semantic score to 0-1
            semantic_score = max(0.0, min(1.0, semantic_score))

            # 4. Extract structured evaluation from LLM
            llm_skill_score = llm_eval.get("skill_match", 50) / 100.0
            llm_exp_score = llm_eval.get("experience_match", 50) / 100.0
            llm_overall = llm_eval.get("overall_score", 50) / 100.0

            # Generate reasoning
            reasons = llm_eval.get("strengths", [])[:2] + llm_eval.get("gaps", [])[:2]

            # Calculate final score blending embeddings (fast/reliable semantic) and LLM (deep reasoning)
            final_score = (llm_overall * 0.7) + (semantic_score * 0.3)

            return MatchResult(
                score=round(final_score, 3),
                semantic_similarity=round(semantic_score, 3),
                skill_match=round(llm_skill_score, 3),
                experience_match=round(llm_exp_score, 3),
                reasons=reasons or ["Profile matches job description"],
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

    async def find_best_matches(self, job_seeker: Dict[str, Any], jobs: List[Dict[str, Any]], top_k: int = 10) -> List[MatchResult]:
        """Find best job matches concurrently"""
        tasks = [self.calculate_match_score(job_seeker, job) for job in jobs]
        matches = await asyncio.gather(*tasks)
        
        # Sort by score descending
        matches.sort(key=lambda x: x.score, reverse=True)
        return matches[:top_k]

    async def analyze_candidates_for_job(self, job: Dict[str, Any], candidates: List[Dict[str, Any]]) -> List[CandidateAnalysis]:
        """Analyze multiple candidates concurrently"""
        tasks = [self.calculate_match_score(candidate, job) for candidate in candidates]
        matches = await asyncio.gather(*tasks)

        analyses = []
        for i, match in enumerate(matches):
            candidate = candidates[i]
            analysis = CandidateAnalysis(
                candidate_id=candidate.get('id', 0),
                job_id=job.get('id', 0),
                overall_score=match.score,
                skill_alignment=match.skill_match,
                experience_fit=match.experience_match,
                cultural_fit=0.8, # Mocked
                recommendations=self._generate_candidate_recommendations(match)
            )
            analyses.append(analysis)

        analyses.sort(key=lambda x: x.overall_score, reverse=True)
        return analyses

    async def get_hiring_suggestions(self, job_draft: Dict[str, Any]) -> Dict[str, Any]:
        """Provide AI suggestions for job posting improvements using LLM"""
        prompt = prompts.JOB_DESCRIPTION_USER.format(job_draft=str(job_draft))
        return await nvidia_client.generate_structured(
            prompt=prompt,
            system_prompt=prompts.JOB_DESCRIPTION_SYSTEM,
            temperature=0.3
        )

    def _create_job_seeker_text(self, job_seeker: Dict[str, Any]) -> str:
        parts = []
        if job_seeker.get('title'):
            parts.append(f"Job title: {job_seeker['title']}")
        skills = job_seeker.get('skills', [])
        if skills:
            parts.append(f"Skills: {', '.join(skills)}")
        experience = job_seeker.get('experience_years', 0)
        if experience:
            parts.append(f"Experience: {experience} years")
        education = job_seeker.get('education', '')
        if education:
            parts.append(f"Education: {education}")
        summary = job_seeker.get('summary', '')
        if summary:
            parts.append(f"Profile: {summary}")
        return '. '.join(parts)

    def _create_job_text(self, job: Dict[str, Any]) -> str:
        parts = []
        if job.get('title'):
            parts.append(f"Job title: {job['title']}")
        description = job.get('description', '')
        if description:
            parts.append(f"Description: {description}")
        requirements = job.get('requirements', '')
        if requirements:
            parts.append(f"Requirements: {requirements}")
        skills = job.get('skills_required', [])
        if skills:
            parts.append(f"Required skills: {', '.join(skills)}")
        level = job.get('experience_level', '')
        if level:
            parts.append(f"Experience level: {level}")
        return '. '.join(parts)

    def _generate_candidate_recommendations(self, match: MatchResult) -> List[str]:
        if match.score > 0.8:
            return ["Strong candidate - prioritize for interview"]
        elif match.skill_match < 0.6:
            return ["Consider upskilling in key required technologies"]
        return ["Good candidate, evaluate cultural fit"]