import pytest
from matching_engine.report_generator import generate_match_report_xlsx

def test_generate_match_report_xlsx():
    job = {
        "title": "Software Engineer",
        "skills_required": ["Python", "FastAPI", "React", "Docker"],
        "experience_level": "mid"
    }
    
    candidates = [
        {
            "name": "Alice Developer",
            "skills": ["Python", "FastAPI", "Docker", "Git"],
            "experience_years": 4,
            "overall_score": 0.85,
            "skill_alignment": 0.75,
            "experience_fit": 0.90,
            "cultural_fit": 0.85,
            "recommendations": ["Strong in backend development.", "Good Docker experience."]
        },
        {
            "name": "Bob Frontend",
            "skills": ["React", "HTML", "CSS", "JavaScript"],
            "experience_years": 2,
            "overall_score": 0.55,
            "skill_alignment": 0.25,
            "experience_fit": 0.50,
            "cultural_fit": 0.90,
            "recommendations": ["Lacks backend skills.", "Consider for frontend-only roles."]
        }
    ]
    
    # Test normal report
    report_bytes = generate_match_report_xlsx(job, candidates, anonymize=False)
    assert isinstance(report_bytes, bytes)
    assert len(report_bytes) > 0
    
    # Test anonymized report
    anon_report_bytes = generate_match_report_xlsx(job, candidates, anonymize=True)
    assert isinstance(anon_report_bytes, bytes)
    assert len(anon_report_bytes) > 0
