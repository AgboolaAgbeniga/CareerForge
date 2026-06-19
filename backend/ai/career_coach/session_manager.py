from typing import Dict, List, Any, Optional
import uuid

class SessionManager:
    """Simple in-memory session manager for Career Coach"""
    
    def __init__(self):
        self.sessions: Dict[str, List[Dict[str, Any]]] = {}
    
    def create_session(self) -> str:
        """Create a new session and return its ID"""
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = []
        return session_id
    
    def add_message(self, session_id: str, role: str, content: str):
        """Add a message to the session history"""
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        
        self.sessions[session_id].append({
            "role": role,
            "content": content,
            "timestamp": "now" # In real app, use datetime
        })
    
    def get_history(self, session_id: str) -> List[Dict[str, Any]]:
        """Get message history for a session"""
        return self.sessions.get(session_id, [])

    def get_context_string(self, session_id: str) -> str:
        """Convert history to a context string for the model"""
        history = self.get_history(session_id)
        if not history:
            return ""
        
        # Format: "User: <msg>\nCoach: <msg>\n..."
        context_parts = []
        for msg in history[-5:]: # Keep last 5 messages for context window
            role_name = "User" if msg["role"] == "user" else "Coach"
            context_parts.append(f"{role_name}: {msg['content']}")
        
        return "\n".join(context_parts)
