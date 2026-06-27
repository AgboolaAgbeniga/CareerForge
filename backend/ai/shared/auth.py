import os
import httpx
from functools import wraps
from fastapi import Request, HTTPException

async def verify_supabase_token(token: str) -> dict:
    """
    Verify the Supabase JWT token.
    Delegates to Supabase's auth service by querying the GoTrue /user endpoint.
    Also supports mock tokens in non-production environments.
    """
    node_env = os.getenv("NODE_ENV", "development")
    if node_env != "production" and token.startswith("mock-token-"):
        mock_user_id = token[len("mock-token-"):]
        return {
            "id": mock_user_id,
            "email": "mock@example.com",
            "role": "authenticated"
        }

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_anon_key = os.getenv("SUPABASE_ANON_KEY")
    if not supabase_url or not supabase_anon_key:
        raise HTTPException(
            status_code=500,
            detail="Supabase URL and Anon Key must be configured in environment variables"
        )

    # Use httpx to contact the GoTrue API endpoint
    async with httpx.AsyncClient() as client:
        try:
            # Query /auth/v1/user using the token as Authorization header and anon key as apiKey
            response = await client.get(
                f"{supabase_url}/auth/v1/user",
                headers={
                    "Authorization": f"Bearer {token}",
                    "apikey": supabase_anon_key
                }
            )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid or expired Supabase authentication token"
                )
            
            user_data = response.json()
            return user_data
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=503,
                detail=f"Authentication service temporarily unavailable: {str(exc)}"
            )

def require_auth(func):
    """
    FastAPI decorator to enforce authentication on endpoints.
    Requires the decorated endpoint function to accept a `request: Request` argument.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Locate the Request object in kwargs or args
        request = kwargs.get("request")
        if not request:
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break

        if not request:
            raise HTTPException(
                status_code=500,
                detail="Endpoint misconfigured: require_auth requires a fastapi.Request argument in the handler"
            )

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(
                status_code=401,
                detail="Authorization header missing or must start with 'Bearer '"
            )

        token = auth_header.split(" ")[1]
        user_data = await verify_supabase_token(token)
        
        # Attach the authenticated user data to the request state
        request.state.user = user_data
        return await func(*args, **kwargs)

    return wrapper
