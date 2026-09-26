from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os

from app.rag_engine import rag_engine
from app.multi_agent import multi_agent_system
from app.mcp_integrations import mcp_router

app = FastAPI(
    title="Enterprise Knowledge Investigator - AI RAG & Multi-Agent Engine",
    description="Python FastAPI engine for document chunking, semantic retrieval, multi-agent orchestration, and MCP integrations.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    case_id: Optional[int] = None
    top_k: Optional[int] = 4

class MultiAgentRequest(BaseModel):
    goal: str
    case_id: Optional[int] = None
    focus_area: Optional[str] = "All"

class MCPQueryRequest(BaseModel):
    server_name: str = "SharePoint"
    query: str

@app.get("/")
def home():
    return {
        "service": "Enterprise Knowledge Investigator RAG & Agent Engine",
        "status": "Online",
        "version": "1.0.0",
        "endpoints": ["/upload", "/query", "/documents", "/document/{doc_id}", "/run-agents", "/mcp/route"]
    }

@app.post("/upload")
async def upload_document(file: UploadFile = File(...), case_id: Optional[int] = Form(None)):
    try:
        content_bytes = await file.read()
        content_text = content_bytes.decode("utf-8", errors="ignore")
        if not content_text.strip():
            content_text = f"Document content for file {file.filename}. Uploaded for enterprise knowledge analysis."

        doc = rag_engine.add_document(file.filename, content_text, case_id=case_id)
        return {
            "message": "Document indexed successfully into vector engine.",
            "document": doc
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query")
def query_rag(req: QueryRequest):
    return rag_engine.answer_query(req.query, top_k=req.top_k or 4)

@app.get("/documents")
def list_documents():
    return {
        "count": len(rag_engine.documents),
        "documents": [
            {
                "id": d["id"],
                "filename": d["filename"],
                "case_id": d["case_id"],
                "chunk_count": d["chunk_count"]
            }
            for d in rag_engine.documents
        ]
    }

@app.delete("/document/{doc_id}")
def delete_document(doc_id: str):
    rag_engine.documents = [d for d in rag_engine.documents if d["id"] != doc_id]
    return {"message": f"Document {doc_id} deleted successfully."}

@app.post("/run-agents")
def run_agents(req: MultiAgentRequest):
    return multi_agent_system.execute_workflow(req.goal, case_id=req.case_id, focus_area=req.focus_area)

@app.post("/mcp/route")
def route_mcp(req: MCPQueryRequest):
    return mcp_router.route_query(req.server_name, req.query)