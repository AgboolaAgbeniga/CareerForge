from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from ai.vector.pgvector import ensure_extension_and_table, upsert_embedding, search_embeddings, get_model_info
from ai.shared.utils import get_logger

router = APIRouter(prefix="/vectors", tags=["vectors"])
logger = get_logger(__name__)


class IndexRequest(BaseModel):
    candidate_id: int
    model_id: str
    model_dim: Optional[int] = None
    role: Optional[str] = None
    embedding: List[float] = Field(..., min_items=1)
    payload: Optional[Dict[str, Any]] = None


class SearchRequest(BaseModel):
    embedding: List[float] = Field(..., min_items=1)
    model_id: Optional[str] = None
    role: Optional[str] = None
    top_k: int = Field(10, ge=1, le=100)


@router.post("/init")
async def init_vector_table():
    """Initialize DB extension and table (idempotent)."""
    try:
        ensure_extension_and_table()
        return {"status": "ok"}
    except Exception as e:
        logger.error("Failed to init vector table: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/index")
async def index_vector(req: IndexRequest):
    """Index an embedding with model metadata. If model_dim not supplied, try to read from manifest."""
    try:
        model_dim = req.model_dim
        if model_dim is None:
            info = get_model_info(req.model_id)
            if info and info.get('model_dim'):
                model_dim = int(info.get('model_dim'))
            else:
                raise HTTPException(status_code=400, detail="model_dim is required when not present in manifest")

        upsert_embedding(req.candidate_id, req.model_id, model_dim, req.embedding, req.payload, req.role)
        return {"status": "indexed", "candidate_id": req.candidate_id, "model_id": req.model_id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Indexing failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search")
async def search_vectors(req: SearchRequest):
    try:
        results = search_embeddings(req.embedding, req.top_k, model_id=req.model_id, role=req.role)
        return {"results": results}
    except Exception as e:
        logger.error("Search failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))
