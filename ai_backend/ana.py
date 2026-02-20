from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from openai import OpenAI
from qdrant_client import QdrantClient
client=OpenAI(
    api_key="AIzaSyD58dn7TLCfdGm2uEkVOrsuTk_Xe_ot1aE",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001", api_key="AIzaSyDrVRvdK4xd6lDFPqhZdhk0W0ZKwzYQBH0")
qdrant_client = QdrantClient(url="http://localhost:6333")
vector_db=QdrantVectorStore(
   client=qdrant_client,
    collection_name="english_query",
    embedding=embeddings
)
user_query=input("Ask anything :" )
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
print(response.choices[0].message.content)

