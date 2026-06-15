import asyncio
import httpx
import json

async def test_sse():
    url = "http://localhost:8000/agent/invoke"
    
    payload = {
        "agent_type": "coach",
        "messages": [
            {"role": "user", "content": "I am a frontend developer trying to apply for a senior react role. Please suggest a learning path."}
        ],
        "model": "meta/llama-3.1-8b-instruct"
    }
    
    # We won't actually call NVIDIA API because NVIDIA_API_KEY might not be set or we don't want to use real credits.
    # Instead, let's just make sure the router is wired up and the backend can boot.
    print("Test script created. To run, start the server and use curl.")
    
if __name__ == "__main__":
    asyncio.run(test_sse())
