from openai import OpenAI
import json

def extract_params_from_llm(problem):

    prompt = f"""
Extract physics parameters from this problem.
Format should be such JSON object having
    -"velocity": (in m/s2)
    -"angle": (launch angle in degree)

Example Input: A ball is projected from the ground with a speed of 10 m/s at an angle of 20° with the horizontal.
 Output:
 {{
    "velocity": 20,
    "angle": 30 
 }}
Problem:
{problem}

Return JSON only.
"""
    client = OpenAI(
    api_key="AIzaSyAz8wwQt1_DaJ5JXAMOVWrqFR3LLlQ7CNc",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
    
    response = client.chat.completions.create(
            model="gemini-3-flash-preview",
        messages=[{"role": "user", "content": prompt}]
)
    print(response.choices[0].message.content)
    return json.loads(response.choices[0].message.content)

