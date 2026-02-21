from fastapi import FastAPI,UploadFile,File,Form, HTTPException
from openai import OpenAI
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_qdrant import QdrantVectorStore
from langchain_community.embeddings import HuggingFaceEmbeddings
from qdrant_client import QdrantClient
from fastapi.middleware.cors import CORSMiddleware
import shutil
from tempfile import NamedTemporaryFile
from pydantic import BaseModel,Field
import os
from videoGen.paramExtraction import extract_params_from_llm
from videoGen.manim import generate_manim_script
import subprocess
from fastapi.staticfiles import StaticFiles

import pyttsx3
from fastapi.concurrency import run_in_threadpool
from fastapi.staticfiles import StaticFiles
import re
import uuid


from flowgen.index import sanitize_mermaid

app=FastAPI()
AUDIO_DIR = "audio_files"
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs("videos", exist_ok=True)

app.mount("/audio", StaticFiles(directory=AUDIO_DIR), name="audio")
app.mount("/media", StaticFiles(directory="media"), name="media")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
def generate_audio(text: str, filename: str)->None:
    engine = pyttsx3.init()
    engine.save_to_file(text, filename)
    engine.runAndWait()
    engine.stop() 
class UserInput(BaseModel):
    ques:str=Field(...,description="question to be asked")
client=OpenAI(
    api_key="",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
text_splitter=RecursiveCharacterTextSplitter(
    chunk_size=2000,
    chunk_overlap=200
)
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5",
    encode_kwargs={"normalize_embeddings": True}
)
qdrant_client = QdrantClient(url="http://localhost:6333")

@app.post("/uploadfile/")
async def upload(file:UploadFile=File(...),ques: str = Form(...)):
    print("File received:", file.filename)
    print("Question received:", ques)
    name=str(file.filename)
    with NamedTemporaryFile(delete=False,suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file,tmp)
        temp_path=tmp.name

    if not qdrant_client.collection_exists(name):
    
        loader = PyPDFLoader(temp_path)
        docs = loader.load()
        chunks = text_splitter.split_documents(docs)

        QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url="http://localhost:6333",
        collection_name=name
       )
    
    vector_db=QdrantVectorStore(
    client=qdrant_client,
    collection_name=name,
    embedding=embeddings
    )
    user_query=ques
    search_result=vector_db.similarity_search(query=user_query)
    context = "\n\n".join(
    f"Page Content: {result.page_content}\n"
    f"Page Number: {result.metadata['page_label']}\n"
    f"File Location: {result.metadata['source']}"
    for result in search_result
    )
    SYSTEM_PROMPT=f"""
    You are an AI assistant, who answers the query of asked question of users.
    You will be answering the query based on available information, retrieved from pdf file,
    along with page number and page content.
    Answer only the question asked.
    Context
    {context}
    """
    response=client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role":"system","content":SYSTEM_PROMPT},
        {"role":"user","content":user_query}
    ]
    )
    resp=response.choices[0].message.content
    
    safe_name = re.sub(r"[^a-zA-Z0-9_-]", "_", os.path.splitext(name)[0])
    audio_filename = f"{safe_name}.wav"
    audio_filepath = os.path.join(AUDIO_DIR, audio_filename)
    await run_in_threadpool(generate_audio, resp, audio_filepath)
    
    return {
        "answer": resp,
        "audio_url": f"http://127.0.0.1:8000/audio/{audio_filename}"        # full URL path for the client
    }
@app.post("/generate-animation")
async def generate_animation(problem: str = Form(...)):
    params = extract_params_from_llm(problem)

    video_path = generate_manim_script(params)
    # video_path =generate_manim_script({
    #     "type": "projectile",
    #     "velocity": 25,
    #     "angle": 60
    # })
    # unique_id = str(uuid.uuid4())
    # output_name = f"{unique_id}.mp4"
    # subprocess.run([
    #     "manim",
    #     "generated_scene.py",
    #     "ProjectileScene",
    #     "-ql",
    #     "--media_dir", "videos",
    #     "-output_file", unique_id
    # ])
    return {
        "answer": params["answer"],
        "video_url": f"http://localhost:8000/{video_path}"
    }

@app.post("/uploadfile/")
async def upload(file:UploadFile=File(...),ques: str = Form(...)):
    name=str(file.filename)
    with NamedTemporaryFile(delete=False,suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file,tmp)
        temp_path=tmp.name

    if not qdrant_client.collection_exists(name):
    
        loader = PyPDFLoader(temp_path)
        docs = loader.load()
        chunks = text_splitter.split_documents(docs)

        QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url="http://localhost:6333",
        collection_name=name
       )
    
    vector_db=QdrantVectorStore(
    client=qdrant_client,
    collection_name=name,
    embedding=embeddings
    )
    user_query=ques
    search_result=vector_db.similarity_search(query=user_query)
    context = "\n\n".join(
    f"Page Content: {result.page_content}\n"
    f"Page Number: {result.metadata['page_label']}\n"
    f"File Location: {result.metadata['source']}"
    for result in search_result
    )
    SYSTEM_PROMPT=f"""
    You are an AI assistant, who answers the query of asked question of users.
    You will be answering the query based on available information, retrieved from pdf file,
    along with page number and page content.
    Answer only the question asked.
    Context
    {context}
    """
    response=client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role":"system","content":SYSTEM_PROMPT},
        {"role":"user","content":user_query}
    ]
    )
    resp=response.choices[0].message.content
    
    safe_name = re.sub(r"[^a-zA-Z0-9_-]", "_", os.path.splitext(name)[0])
    audio_filename = f"{safe_name}.wav"
    audio_filepath = os.path.join(AUDIO_DIR, audio_filename)
    await run_in_threadpool(generate_audio, resp, audio_filepath)
    
    return {
        "answer": resp,
        "audio_url": f"http://127.0.0.1:8000/audio/{audio_filename}"        # full URL path for the client
    }
    
    
@app.post("/flowchart/")
async def chat(input: str = Form(...)):
    SYSTEM_PROMPT=SYSTEM_PROMPT="""
You are a Mermaid.js flowchart generator.

Your task is to return ONLY valid Mermaid.js code.

STRICT RULES:
- Output must start with: graph TD  OR  flowchart LR
- Do NOT use markdown or backticks
- Do NOT write explanations or any extra text
- Do NOT wrap the code in ```mermaid
- Return plain text only

FLOWCHART RULES:
- Use clear node IDs like A, B, C, D
- Every connection must be written separately
  (Example: A --> B and A --> C, NEVER use "A and B --> C")

TEXT SAFETY RULES:
- Do NOT use square brackets inside node text
- Do NOT use round brackets inside node text
- Replace special characters:
  :  →  -
  &  →  and
  /  →  space
- Keep labels short and readable

STYLING RULES:
- Use valid Mermaid style syntax only
  Example: style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
- Do NOT put spaces inside style properties

SUBGRAPH RULES:
- Subgraphs must follow valid Mermaid syntax
- All nodes inside must be properly connected

OUTPUT QUALITY:
- The flowchart must be well-structured and visually balanced
- Prefer vertical layout for processes (graph TD)
- Avoid crossing arrows when possible

EXAMPLE OUTPUT FORMAT:

graph TD
    A[Start] --> B{Valid?}
    B -->|Yes| C[Access granted]
    B -->|No| D[Retry]

Return ONLY the Mermaid code.

"""
    try:
        response=client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role":"system","content":SYSTEM_PROMPT},
        {"role":"user","content":input}
    ]
    )
        resp = response.choices[0].message.content
        print(resp)
        resp = resp.strip()
        print("end")
        resp=sanitize_mermaid(resp)
        print("sanitized:", resp)
        # conversation.messages.append({"role": "assistant", "content": response})
        return {
            "response": resp,
            # "conversation_id": input.conversation_id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Chat session ended: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)