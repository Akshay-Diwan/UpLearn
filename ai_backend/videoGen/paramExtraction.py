from openai import OpenAI
import json

def extract_params_from_llm(problem) :

    prompt = f"""
You are a physics parameter extraction and solution engine.

Your task is to read a user’s physics question and convert it into a structured JSON object that will be used to:

1) Generate a Manim animation  
2) Show a step-by-step physics solution to the student

--------------------------------------

OUTPUT RULES (VERY STRICT)

Return ONLY valid JSON.

Do NOT return:
- markdown
- explanation outside JSON
- comments
- units in numeric fields

All numerical values must be numbers (int or float).

--------------------------------------

STEP 1 — IDENTIFY QUESTION TYPE

Supported types:

- "projectile"
- "circular"
- "nlm"

If not supported:

{{
  "type": null,
  "answer": "Unsupported question type."
}}

--------------------------------------

STEP 2 — EXTRACT PARAMETERS

For "projectile":

{{
  "type": "projectile",
  "velocity": number,
  "angle": number,
  "answer": "step-by-step solution"
}}

For "circular":

{{
  "type": "circular",
  "radius": number,
  "omega": number,
  "answer": "step-by-step solution"
}}

For "nlm":

{{
  "type": "nlm",
  "force": number,
  "mass": number,
  "answer": "step-by-step solution"
}}

--------------------------------------

STEP 3 — PHYSICS SOLUTION REQUIREMENTS

The "answer" field must:

• Be step-by-step  
• Be concept-focused  
• Show formulas used  
• Substitute values  
• Show final result clearly  

Use plain text.

Example format inside "answer":

Step 1: Write the given values  
Step 2: Choose the correct formula  
Step 3: Substitute the values  
Step 4: Calculate the result  
Step 5: State the final answer  

--------------------------------------

PHYSICS RULES

• Angle must be in degrees  
• Angular velocity must be in rad/s  
• Do NOT include units in JSON numeric fields  
• Convert words into numbers  
• Infer values only if clearly implied, otherwise use null  

--------------------------------------

EXAMPLE

Input:
A ball is thrown with a speed of 20 m/s at an angle of 30 degrees. Find the time of flight.

Output:

{{
  "type": "projectile",
  "velocity": 20,
  "angle": 30,
  "answer": "Step 1: Given u = 20 and angle = 30. Step 2: Time of flight formula T = 2u sinθ / g. Step 3: Substitute values T = 2 × 20 × sin30 / 9.8. Step 4: T = 40 × 0.5 / 9.8. Step 5: T ≈ 2.04 seconds."
}}

--------------------------------------

USER QUESTION:
{problem}
"""
    client = OpenAI(
    api_key="",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)
    
    response = client.chat.completions.create(
            model="gemini-3-flash-preview",
        messages=[{"role": "user", "content": prompt}]
)
    print(response.choices[0].message.content)
    return json.loads(response.choices[0].message.content)

