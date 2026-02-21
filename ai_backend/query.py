from fastapi import FastAPI,UploadFile,File,Form
from openai import OpenAI
from pathlib import Path
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_qdrant import QdrantVectorStore
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from qdrant_client import QdrantClient
from fastapi.middleware.cors import CORSMiddleware
import shutil
from tempfile import NamedTemporaryFile
from pydantic import BaseModel,Field
import os
from videoGen.paramExtraction import extract_params_from_llm
from videoGen.manim import generate_manim_script

from fastapi.staticfiles import StaticFiles

import pyttsx3
from fastapi.concurrency import run_in_threadpool
from fastapi.staticfiles import StaticFiles
import re
app=FastAPI()

AUDIO_DIR = "audio_files"
os.makedirs(AUDIO_DIR, exist_ok=True)

app.mount("/audio", StaticFiles(directory=AUDIO_DIR), name="audio")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/media", StaticFiles(directory="media"), name="media")
# class UserInput(BaseModel):
#     ques:str=Field(...,description="question to be asked")
# client=OpenAI(
#     api_key="AIzaSyD58dn7TLCfdGm2uEkVOrsuTk_Xe_ot1aE",
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
# )
# text_splitter=RecursiveCharacterTextSplitter(
#     chunk_size=2000,
#     chunk_overlap=200
# )
# embeddings = HuggingFaceEmbeddings(
#     model_name="BAAI/bge-small-en-v1.5",
#     encode_kwargs={"normalize_embeddings": True}
# )
def generate_audio(text: str, filename: str)->None:
    engine = pyttsx3.init()
    engine.save_to_file(text, filename)
    engine.runAndWait()
    engine.stop() 
class UserInput(BaseModel):
    ques:str=Field(...,description="question to be asked")
client=OpenAI(
    api_key="AIzaSyCj0Fq9r5ulrCDePRh-QXsXjgbf0vR20s8",
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

# @app.post("/uploadfile/")
# async def upload(file:UploadFile=File(...),ques: str = Form(...)):
#     name=str(file.filename)
#     with NamedTemporaryFile(delete=False,suffix=".pdf") as tmp:
#         shutil.copyfileobj(file.file,tmp)
#         temp_path=tmp.name
#     loader=PyPDFLoader(file_path=temp_path) 
#     docs=loader.load()
#     chunks=text_splitter.split_documents(documents=docs)
#     vector_store=QdrantVectorStore.from_documents(
#     documents=chunks,
#     embedding=embeddings,
#     url="http://localhost:6333",
#     collection_name=name
#     )
#     qdrant_client = QdrantClient(url="http://localhost:6333")
#     vector_db=QdrantVectorStore(
#     client=qdrant_client,
#     collection_name=name,
#     embedding=embeddings
#     )
#     user_query=ques
#     search_result=vector_db.similarity_search(query=user_query)
#     context = "\n\n".join(
#     f"Page Content: {result.page_content}\n"
#     f"Page Number: {result.metadata['page_label']}\n"
#     f"File Location: {result.metadata['source']}"
#     for result in search_result
#     )
#     SYSTEM_PROMPT=f"""
#     You are an AI assistant, who answers the query of asked question of users.
#     You will be answering the query based on available information, retrieved from pdf file,
#     along with page number and page content.
#     Answer only the question asked.
#     Context
#     {context}
#     """
#     response=client.chat.completions.create(
#     model="gemini-2.5-flash",
#     messages=[
#         {"role":"system","content":SYSTEM_PROMPT},
#         {"role":"user","content":user_query}
#     ]
#     )
#     return {"answer":response.choices[0].message.content}
    

@app.post("/generate-animation")
async def generate_animation(problem: str):

    params = extract_params_from_llm(problem)

    video_path = generate_manim_script(params)

    # subprocess.run([
    #     "manim",
    #     "generated_scene.py",
    #     "ProjectileScene",
    #     "-ql"
    # ])
    return {
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
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)