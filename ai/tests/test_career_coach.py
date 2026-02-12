import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from career_coach.coach import CareerCoach, CareerAdvice

class TestCareerCoach(unittest.TestCase):
    def setUp(self):
        # Mock config and shared utils if needed, or rely on graceful fallback
        self.coach = CareerCoach()
        # Force fallback by ensuring generator is None (if not already)
        if hasattr(self.coach, 'generator') and self.coach.generator:
            pass # Use real if available, or mock it? 
                 # For unit tests, we usually want to avoid loading massive models.
                 # But the class loads it in __init__. 
                 # We'll assert on the structure of the response regardless of source.

    def test_provide_advice_structure(self):
        user_profile = {
            "title": "Junior Developer",
            "skills": ["python", "javascript"],
            "experience_years": 1
        }
        context = "How can I get promoted?"
        
        advice = self.coach.provide_advice(user_profile, context)
        
        self.assertIsInstance(advice, CareerAdvice)
        self.assertTrue(len(advice.advice) > 0)
        self.assertIsInstance(advice.action_items, list)
        self.assertIsInstance(advice.resources, list)
        self.assertTrue(0 <= advice.confidence_score <= 1)

    def test_analyze_user_situation_entry_level(self):
        user_profile = {"experience_years": 1}
        analysis = self.coach._analyze_user_situation(user_profile, "career advice")
        self.assertEqual(analysis["experience_level"], "entry")

    def test_analyze_user_situation_senior_level(self):
        user_profile = {"experience_years": 6}
        analysis = self.coach._analyze_user_situation(user_profile, "career advice")
        self.assertEqual(analysis["experience_level"], "senior")

    def test_linkedin_optimization_fallback(self):
        # Ensure fallback logic works even if generator fails
        with patch.object(self.coach, 'generator', None):
            result = self.coach.optimize_linkedin_profile("Dev", "Senior Dev")
            self.assertIn("Senior Dev", result.optimized_headline)
            self.assertIn("Dev", result.optimized_headline)

if __name__ == '__main__':
    unittest.main()
