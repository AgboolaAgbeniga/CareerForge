import pytest
from unittest.mock import MagicMock, patch, AsyncMock
import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from career_coach.coach import CareerCoach, CareerAdvice, LinkedInOptimization

@pytest.fixture
def coach():
    return CareerCoach()

@pytest.mark.asyncio
async def test_provide_advice_structure(coach):
    user_profile = {
        "title": "Junior Developer",
        "skills": ["python", "javascript"],
        "experience_years": 1
    }
    context = "How can I get promoted?"
    
    # Mock nvidia_client.generate_structured
    mock_res = {
        "advice": "Test advice content",
        "action_items": ["Item 1", "Item 2"],
        "resources": ["Resource 1"],
        "confidence_score": 0.9
    }
    with patch('shared.nvidia_client.nvidia_client.generate_structured', new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = mock_res
        advice = await coach.provide_advice(user_profile, context)
        
        assert isinstance(advice, CareerAdvice)
        assert advice.advice == "Test advice content"
        assert advice.action_items == ["Item 1", "Item 2"]
        assert advice.resources == ["Resource 1"]
        assert advice.confidence_score == 0.9

@pytest.mark.asyncio
async def test_linkedin_optimization(coach):
    mock_res = {
        "optimized_headline": "Optimized Headline",
        "profile_tips": ["Tip 1"],
        "keyword_suggestions": ["Keyword 1"]
    }
    with patch('shared.nvidia_client.nvidia_client.generate_structured', new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = mock_res
        result = await coach.optimize_linkedin_profile("Dev", "Senior Dev")
        
        assert isinstance(result, LinkedInOptimization)
        assert result.optimized_headline == "Optimized Headline"
        assert result.suggestions == ["Tip 1"]
        assert result.keywords_added == ["Keyword 1"]

@pytest.mark.asyncio
async def test_generate_cover_letter_document(coach):
    content = "Dear Hiring Manager,\n\nI am writing to apply..."
    candidate_info = {"name": "John Doe", "email": "john@example.com"}
    job_info = {"company": "Google", "title": "Software Engineer"}
    
    docx_bytes = await coach.generate_cover_letter_document(content, candidate_info, job_info)
    assert isinstance(docx_bytes, bytes)
    assert len(docx_bytes) > 0

@pytest.mark.asyncio
async def test_generate_resume_document(coach):
    parsed_data = {
        "name": "John Doe",
        "personal_info": {"email": "john@example.com", "phone": "123-456-7890"},
        "summary": "Experienced engineer",
        "skills": ["Python", "Docker"],
        "experience": [
            {
                "title": "Software Engineer",
                "company": "Tech Inc",
                "start_date": "2020",
                "end_date": "2023",
                "bullets": ["Wrote code", "Fixed bugs"]
            }
        ]
    }
    docx_bytes = await coach.generate_resume_document(parsed_data)
    assert isinstance(docx_bytes, bytes)
    assert len(docx_bytes) > 0
