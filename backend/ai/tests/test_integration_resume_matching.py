"""
Integration tests for Resume Parsing + Job Matching flow
"""
import pytest
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from resume_parser.parser import ResumeParser
from matching_engine.matcher import JobMatcher

class TestResumeToMatchingFlow:
    """Test end-to-end flow from resume parsing to job matching"""
    
    @pytest.fixture
    def resume_parser(self):
        """Create a resume parser instance"""
        return ResumeParser()
    
    @pytest.fixture
    def job_matcher(self):
        """Create a job matcher instance"""
        return JobMatcher()
    
    @pytest.fixture
    def sample_resume_text(self):
        """Sample resume text for testing"""
        return """
        John Doe
        Software Engineer
        john.doe@email.com | +1234567890
        
        EXPERIENCE
        Senior Software Engineer at Tech Corp (2020-2023)
        - Led development of microservices architecture
        - Managed team of 5 developers
        
        SKILLS
        Python, JavaScript, React, Docker, AWS
        
        EDUCATION
        BS Computer Science, MIT, 2018
        """
    
    @pytest.fixture
    def sample_job(self):
        """Sample job posting for matching"""
        return {
            "id": 1,
            "title": "Senior Software Engineer",
            "description": "Looking for experienced engineer",
            "requirements": "Python, React, AWS experience required",
            "skills_required": ["python", "react", "aws", "docker"],
            "experience_level": "senior",
            "min_experience_years": 3
        }
    
    @pytest.mark.asyncio
    async def test_parse_and_match_flow(self, resume_parser, job_matcher, sample_resume_text, sample_job):
        """Test complete flow: parse resume -> match to job"""
        # Step 1: Parse resume
        parsed_resume = await resume_parser.parse_resume(sample_resume_text)
        
        # Verify parsing worked
        assert "skills" in parsed_resume
        assert "experience" in parsed_resume
        assert len(parsed_resume["skills"]) > 0
        
        # Step 2: Extract candidate profile
        candidate = {
            "skills": [s["skill"] for s in parsed_resume["skills"]],
            "experience_years": 3,  # Would be extracted from experience section
            "title": parsed_resume.get("personal_info", {}).get("title", "")
        }
        
        # Step 3: Match to job
        match_result = await job_matcher.calculate_match_score(candidate, sample_job)
        
        # Verify matching worked
        assert match_result.score is not None
        assert 0 <= match_result.score <= 1.0
        assert hasattr(match_result, "reasons")
        
        # Since candidate has python, react, aws - should have decent match
        assert match_result.score * 100 > 50
    
    @pytest.mark.asyncio
    async def test_skill_extraction_accuracy(self, resume_parser, sample_resume_text):
        """Test that skill extraction is accurate"""
        parsed = await resume_parser.parse_resume(sample_resume_text)
        
        skills = [s["skill"].lower() for s in parsed["skills"]]
        
        # Check for expected skills
        expected_skills = ["python", "javascript", "react", "docker", "aws"]
        for skill in expected_skills:
            assert any(skill in s for s in skills), f"Expected skill '{skill}' not found"
    
    @pytest.mark.asyncio
    async def test_experience_extraction(self, resume_parser, sample_resume_text):
        """Test that experience is correctly extracted"""
        parsed = await resume_parser.parse_resume(sample_resume_text)
        
        assert len(parsed["experience"]) > 0
        
        # Check first experience entry
        exp = parsed["experience"][0]
        assert "title" in exp or "company" in exp
    
    @pytest.mark.asyncio
    async def test_low_match_scenario(self, resume_parser, job_matcher):
        """Test matching with low skill overlap"""
        # Resume with different skills
        resume_text = """
        Jane Smith
        Marketing Manager
        jane@email.com
        
        SKILLS
        SEO, Content Marketing, Social Media, Analytics
        
        EXPERIENCE
        Marketing Manager at Brand Co (2019-2023)
        """
        
        parsed = await resume_parser.parse_resume(resume_text)
        
        candidate = {
            "skills": [s["skill"] for s in parsed["skills"]],
            "experience_years": 4,
            "title": "Marketing Manager"
        }
        
        tech_job = {
            "id": 2,
            "title": "Backend Developer",
            "skills_required": ["python", "django", "postgresql", "redis"],
            "experience_level": "mid",
            "min_experience_years": 3
        }
        
        match_result = await job_matcher.calculate_match_score(candidate, tech_job)
        
        # Should have low match score due to skill mismatch
        assert match_result.score * 100 < 40

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
