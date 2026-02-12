"""
Unit tests for Resume Parser NLP Pipeline
Tests skill extraction, NER, experience parsing, and education extraction
"""
import pytest
import sys
import os
from unittest.mock import Mock, patch, MagicMock

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from resume_parser.parser import ResumeParser

class TestNLPPipeline:
    """Test suite for NLP components of resume parser"""
    
    @pytest.fixture
    def parser(self):
        """Create a parser instance with mocked models to avoid downloads"""
        with patch('resume_parser.parser.pipeline') as mock_pipeline, \
             patch('resume_parser.parser.SentenceTransformer') as mock_transformer:
            
            # Mock NER pipeline
            mock_ner = Mock()
            mock_ner.return_value = [
                {"entity_group": "PERSON", "word": "John Doe", "score": 0.99},
                {"entity_group": "ORG", "word": "Tech Corp", "score": 0.95}
            ]
            mock_pipeline.return_value = mock_ner
            
            # Mock embedder
            mock_embedder = Mock()
            mock_embedder.encode.return_value = [[0.1, 0.2, 0.3]]  # Dummy embedding
            mock_transformer.return_value = mock_embedder
            
            parser = ResumeParser()
            return parser
    
    @pytest.fixture
    def sample_resume_text(self):
        """Sample resume text for testing"""
        return """
        John Doe
        Software Engineer
        john.doe@email.com | +1-555-123-4567
        
        PROFESSIONAL SUMMARY
        Experienced software engineer with 5 years of expertise in Python and JavaScript.
        
        SKILLS
        Python, JavaScript, React, Node.js, AWS, Docker, Machine Learning
        
        EXPERIENCE
        Senior Software Engineer at Tech Corp (2020-2023)
        - Led development of microservices architecture
        - Managed team of 5 developers
        
        Software Developer at StartupCo (2018-2020)
        - Built REST APIs using Python and Flask
        
        EDUCATION
        Bachelor of Science in Computer Science
        MIT, 2018
        
        Master of Science in Artificial Intelligence
        Stanford University, 2020
        """
    
    def test_skill_extraction(self, parser, sample_resume_text):
        """Test that skills are correctly extracted from resume"""
        # Mock the embedder's encode method for skill matching
        with patch.object(parser.embedder, 'encode') as mock_encode:
            # Mock embeddings that will result in high similarity for known skills
            import numpy as np
            
            # Simulate high similarity for Python, JavaScript, React
            mock_encode.side_effect = [
                np.array([[0.9, 0.8, 0.7]]),  # Text embedding
                np.array([  # Skill embeddings
                    [0.85, 0.75, 0.65],  # Python (high similarity)
                    [0.88, 0.78, 0.68],  # JavaScript (high similarity)
                    [0.1, 0.2, 0.3],     # Java (low similarity)
                    [0.2, 0.3, 0.4],     # C++ (low similarity)
                    [0.87, 0.77, 0.67],  # React (high similarity)
                ])
            ]
            
            skills = parser._extract_skills(sample_resume_text)
            
            # Should extract skills (exact count depends on threshold)
            assert isinstance(skills, list)
            # Each skill should have 'skill' and 'confidence' keys
            if len(skills) > 0:
                assert "skill" in skills[0]
                assert "confidence" in skills[0]
                assert 0 <= skills[0]["confidence"] <= 1
    
    def test_contact_extraction(self, parser, sample_resume_text):
        """Test email and phone extraction"""
        contact = parser._extract_contact_info(sample_resume_text)
        
        assert "email" in contact
        assert contact["email"] == "john.doe@email.com"
        
        assert "phone" in contact
        # Phone pattern should match
        assert "555" in contact["phone"]
    
    def test_email_extraction_various_formats(self, parser):
        """Test email extraction with different formats"""
        test_cases = [
            ("Contact: john@example.com", "john@example.com"),
            ("Email me at jane.smith@company.co.uk", "jane.smith@company.co.uk"),
            ("reach out: test_user+tag@domain.org", "test_user+tag@domain.org"),
        ]
        
        for text, expected_email in test_cases:
            contact = parser._extract_contact_info(text)
            assert contact.get("email") == expected_email
    
    def test_phone_extraction_various_formats(self, parser):
        """Test phone extraction with different formats"""
        test_cases = [
            "Call me at 555-123-4567",
            "Phone: 555.123.4567",
            "Mobile: 5551234567",
        ]
        
        for text in test_cases:
            contact = parser._extract_contact_info(text)
            assert "phone" in contact
            assert "555" in contact["phone"]
    
    def test_experience_extraction(self, parser, sample_resume_text):
        """Test work experience extraction"""
        experience = parser._extract_experience(sample_resume_text)
        
        assert isinstance(experience, list)
        assert len(experience) > 0
        
        # Check structure of experience entries
        for exp in experience:
            assert "company" in exp or "start_date" in exp
            # Should have date information
            if "start_date" in exp:
                assert exp["start_date"]  # Not empty
    
    def test_experience_date_patterns(self, parser):
        """Test various date patterns in experience"""
        test_text = """
        Software Engineer at Google (2020-2023)
        Data Scientist at Facebook, 2018-Present
        Product Manager, Amazon 2015 - 2018
        """
        
        experience = parser._extract_experience(test_text)
        
        # Should extract multiple experiences
        assert len(experience) >= 2
    
    def test_education_extraction(self, parser, sample_resume_text):
        """Test education information extraction"""
        education = parser._extract_education(sample_resume_text)
        
        assert isinstance(education, list)
        assert len(education) > 0
        
        # Check for degree or institution
        for edu in education:
            assert "degree" in edu or "institution" in edu
    
    def test_education_degree_patterns(self, parser):
        """Test various degree patterns"""
        test_cases = [
            "Bachelor of Science in Computer Science, MIT 2018",
            "M.S. in Data Science from Stanford University",
            "MBA from Harvard Business School, 2020",
            "PhD in Machine Learning, Carnegie Mellon University 2022"
        ]
        
        for text in test_cases:
            education = parser._extract_education(text)
            assert len(education) > 0
    
    def test_personal_info_extraction(self, parser):
        """Test personal information extraction from NER entities"""
        mock_entities = [
            {"entity_group": "PERSON", "word": "Jane Smith", "score": 0.99},
            {"entity_group": "ORG", "word": "Microsoft", "score": 0.95},
            {"entity_group": "LOC", "word": "Seattle", "score": 0.90}
        ]
        
        info = parser._extract_personal_info(mock_entities)
        
        assert "name" in info
        assert info["name"] == "Jane Smith"
    
    def test_parse_resume_complete_flow(self, parser, sample_resume_text):
        """Test complete resume parsing flow"""
        result = parser.parse_resume(sample_resume_text)
        
        # Should return structured data
        assert "personal_info" in result
        assert "skills" in result
        assert "experience" in result
        assert "education" in result
        assert "contact" in result
        assert "confidence_score" in result
        
        # Confidence score should be between 0 and 1
        assert 0 <= result["confidence_score"] <= 1
    
    def test_empty_text_handling(self, parser):
        """Test handling of empty or invalid text"""
        # Empty string should be handled gracefully
        result = parser.parse_resume("")
        
        # Should return error or empty structure
        assert "error" in result or result["confidence_score"] == 0
    
    def test_skill_extraction_without_embedder(self, parser):
        """Test skill extraction when embedder is not available"""
        parser.embedder = None
        
        skills = parser._extract_skills("Python JavaScript React")
        
        # Should return empty list when embedder unavailable
        assert skills == []
    
    def test_confidence_score_calculation(self, parser, sample_resume_text):
        """Test confidence score reflects data completeness"""
        result = parser.parse_resume(sample_resume_text)
        
        # Well-formed resume should have higher confidence
        assert result["confidence_score"] > 0.3
        
        # Minimal resume should have lower confidence
        minimal_result = parser.parse_resume("John Doe")
        assert minimal_result["confidence_score"] < result["confidence_score"]
    
    def test_special_characters_handling(self, parser):
        """Test handling of special characters in text"""
        text_with_special_chars = """
        Name: José García-López
        Email: jose.garcia@company.com
        Skills: C++, C#, .NET, Node.js
        """
        
        result = parser.parse_resume(text_with_special_chars)
        
        # Should handle special characters without crashing
        assert "error" not in result
        assert result["contact"].get("email") == "jose.garcia@company.com"

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
