"""
Integration tests for Career Coach WebSocket sessions
"""
import pytest
import asyncio
import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from career_coach.coach import CareerCoach
from career_coach.session_manager import SessionManager

class TestCareerCoachSessions:
    """Test Career Coach with session management"""
    
    @pytest.fixture
    def coach(self):
        """Create a career coach instance"""
        return CareerCoach()
    
    @pytest.fixture
    def session_manager(self):
        """Create a session manager instance"""
        return SessionManager()
    
    @pytest.fixture
    def sample_user_profile(self):
        """Sample user profile for testing"""
        return {
            "id": 1,
            "title": "Junior Developer",
            "skills": ["python", "javascript"],
            "experience_years": 1,
            "education": "BS Computer Science",
            "summary": "Aspiring software engineer"
        }
    
    def test_session_creation(self, session_manager):
        """Test that sessions can be created"""
        session_id = session_manager.create_session()
        
        assert session_id is not None
        assert len(session_id) > 0
        assert session_id in session_manager.sessions
    
    def test_session_message_storage(self, session_manager):
        """Test that messages are stored in session"""
        session_id = session_manager.create_session()
        
        # Add messages
        session_manager.add_message(session_id, "user", "How do I become a senior developer?")
        session_manager.add_message(session_id, "assistant", "Focus on building expertise...")
        
        # Retrieve history
        history = session_manager.get_history(session_id)
        
        assert len(history) == 2
        assert history[0]["role"] == "user"
        assert history[1]["role"] == "assistant"
    
    def test_session_context_string(self, session_manager):
        """Test context string generation from history"""
        session_id = session_manager.create_session()
        
        session_manager.add_message(session_id, "user", "What skills should I learn?")
        session_manager.add_message(session_id, "assistant", "Focus on Python and React")
        session_manager.add_message(session_id, "user", "How long will it take?")
        
        context = session_manager.get_context_string(session_id)
        
        assert "User: What skills should I learn?" in context
        assert "Coach: Focus on Python and React" in context
        assert "User: How long will it take?" in context
    
    @pytest.mark.asyncio
    async def test_stateful_conversation(self, coach, session_manager, sample_user_profile):
        """Test that coach maintains context across multiple queries"""
        session_id = session_manager.create_session()
        
        # First query
        query1 = "I want to become a senior developer"
        session_manager.add_message(session_id, "user", query1)
        
        context1 = session_manager.get_context_string(session_id)
        advice1 = await coach.provide_advice(sample_user_profile, context1)
        
        session_manager.add_message(session_id, "assistant", advice1.advice)
        
        # Second query (should have context from first)
        query2 = "What skills do I need?"
        session_manager.add_message(session_id, "user", query2)
        
        context2 = session_manager.get_context_string(session_id)
        
        # Context should include previous conversation
        assert "senior developer" in context2.lower()
        
        advice2 = await coach.provide_advice(sample_user_profile, context2)
        
        # Should provide advice
        assert len(advice2.advice) > 0
        assert len(advice2.action_items) > 0
    
    def test_multiple_sessions_isolated(self, session_manager):
        """Test that multiple sessions are isolated from each other"""
        session1 = session_manager.create_session()
        session2 = session_manager.create_session()
        
        # Add different messages to each session
        session_manager.add_message(session1, "user", "Question for session 1")
        session_manager.add_message(session2, "user", "Question for session 2")
        
        history1 = session_manager.get_history(session1)
        history2 = session_manager.get_history(session2)
        
        # Each session should only have its own message
        assert len(history1) == 1
        assert len(history2) == 1
        assert history1[0]["content"] != history2[0]["content"]
    
    def test_session_context_window_limit(self, session_manager):
        """Test that context window is limited to recent messages"""
        session_id = session_manager.create_session()
        
        # Add many messages
        for i in range(10):
            session_manager.add_message(session_id, "user", f"Message {i}")
        
        context = session_manager.get_context_string(session_id)
        
        # Should only include last 5 messages (as per implementation)
        assert "Message 9" in context
        assert "Message 8" in context
        assert "Message 0" not in context  # Too old
    
    @pytest.mark.asyncio
    async def test_advice_with_empty_session(self, coach, sample_user_profile):
        """Test advice generation without session context"""
        # No session context, just direct query
        advice = await coach.provide_advice(sample_user_profile, "How do I improve my skills?")
        
        assert advice is not None
        assert len(advice.advice) > 0
        assert advice.confidence_score > 0

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
