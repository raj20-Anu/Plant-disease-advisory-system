# chatbot.py
from groq import Groq
from deep_translator import GoogleTranslator
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("API_KEY not found in .env")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)
translator = GoogleTranslator()

def ask_chatbot(user_message, target_lang="en"):
    if not user_message:
        return {"error": "Empty message"}

    # Translate to English
    translated_input = translator.translate(user_message, source='auto', target='en')

    # Ask Groq AI
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a helpful crop disease expert and agriculture assistant. "
                "Always give structured, easy-to-read answers using markdown format. "
                "Use clear headings (##), numbered lists, and bullet points where needed. "
                "Highlight key terms in **bold**, and use short paragraphs for readability."},
            {"role": "user", "content": translated_input},
        ]
    )
    ai_response_en = completion.choices[0].message.content

    # Translate back to target language
    translated_response = translator.translate(ai_response_en, source='en', target=target_lang)
    return {"response": translated_response}
