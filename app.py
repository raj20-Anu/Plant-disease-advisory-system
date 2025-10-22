from flask import Flask, request, jsonify
import numpy as np
import keras
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
import os

disease_info = {
    "Pepper,_bell___Bacterial_spot": {
        "solution": "Use copper-based bactericides weekly. Remove infected leaves and avoid overhead watering.",
        "precautions": "Plant certified disease-free seeds, rotate crops annually, and sanitize garden tools."
    },
    "Tomato___Bacterial_spot": {
        "solution": "Apply fungicides like chlorothalonil or copper. Remove infected leaves and ensure good airflow.",
        "precautions": "Avoid overhead watering, mulch around plants, and rotate crops yearly."
    },
    "Tomato___Late_blight": {
        "solution": "Spray with a fungicide containing mancozeb or copper. Destroy infected plants immediately.",
        "precautions": "Avoid watering leaves, maintain spacing, and remove debris from soil."
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
    "solution": "Spray plants with insecticidal soap or neem oil, ensuring thorough coverage under leaves. Introduce natural predators such as ladybugs or predatory mites to control the population.",
    "precautions": "Avoid excessive nitrogen fertilization which encourages mite outbreaks. Keep the plants well-watered to reduce stress, and regularly inspect the underside of leaves for early signs of webbing or yellow specks."
},
    "Apple___Black_rot": {
        "solution": "Prune and destroy affected leaves and fruit. Apply fungicide at bloom and petal fall stages.",
        "precautions": "Avoid wet conditions, remove mummified fruit, and maintain air circulation."
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "solution": "No cure available. Remove and destroy infected trees. Control psyllid insect vectors.",
        "precautions": "Plant certified disease-free saplings, monitor regularly, and use insect control nets."
    }
}
# Create Flask app
app = Flask(__name__)
CORS(app,resources={r"/*":{"origins": "*"}})  # allow frontend to call this API

# Load model once at startup
import tensorflow as tf
import gdown
MODEL_PATH = "exported_model.keras"
FILE_ID = "1VHc85aEhkJgf_OjSgFjR6vDaTC2otjH6"  # <-- replace this with your Google Drive file ID

# Download model if it doesn't exist
if not os.path.exists(MODEL_PATH):
    url = f"https://drive.google.com/uc?id={FILE_ID}"
    gdown.download(url, MODEL_PATH, quiet=False)
model = tf.keras.models.load_model(MODEL_PATH)

# Class names (same as in your main.py)
class_names = [
 'Apple___Apple_scab','Apple___Black_rot','Apple___Cedar_apple_rust','Apple___healthy',
 'Blueberry___healthy','Cherry_(including_sour)___Powdery_mildew','Cherry_(including_sour)___healthy',
 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot','Corn_(maize)___Common_rust_',
 'Corn_(maize)___Northern_Leaf_Blight','Corn_(maize)___healthy','Grape___Black_rot',
 'Grape___Esca_(Black_Measles)','Grape___Leaf_blight_(Isariopsis_Leaf_Spot)','Grape___healthy',
 'Orange___Haunglongbing_(Citrus_greening)','Peach___Bacterial_spot','Peach___healthy',
 'Pepper,_bell___Bacterial_spot','Pepper,_bell___healthy','Potato___Early_blight',
 'Potato___Late_blight','Potato___healthy','Raspberry___healthy','Soybean___healthy',
 'Squash___Powdery_mildew','Strawberry___Leaf_scorch','Strawberry___healthy',
 'Tomato___Bacterial_spot','Tomato___Early_blight','Tomato___Late_blight',
 'Tomato___Leaf_Mold','Tomato___Septoria_leaf_spot','Tomato___Spider_mites Two-spotted_spider_mite',
 'Tomato___Target_Spot','Tomato___Tomato_Yellow_Leaf_Curl_Virus',
 'Tomato___Tomato_mosaic_virus','Tomato___healthy'
]

@app.route('/')
def home():
    return "✅ Flask backend running! Use /predict endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded.'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name.'}), 400

    # Save temporarily
    img_path = os.path.join("temp.jpg")
    file.save(img_path)

    # Load and preprocess image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = np.expand_dims(image.img_to_array(img), axis=0)
    

    # Predict
    pred = model.predict(img_array)
    pred_class_idx = np.argmax(pred)
    confidence = float(pred[0][pred_class_idx])
    result = class_names[pred_class_idx]

    os.remove(img_path)

    # ✅ Get info from dictionary if available
    info = disease_info.get(result, {
        "solution": "No solution provided.",
        "precautions": "No precautions available."
    })

    return jsonify({
        'class': result,
        'confidence': round(confidence * 100, 2),
        'solution': info["solution"],
        'precautions': info["precautions"]
    })
from groq import Groq
from deep_translator import GoogleTranslator

# 🗝 Your Groq API key (get it from https://console.groq.com)
client = Groq(api_key="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")
translator = GoogleTranslator()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415

        data = request.get_json(force=True)
        user_message = data.get("message", "")
        target_lang = data.get("language", "en")

        if not user_message:
            return jsonify({"error": "Empty message"}), 400

        # Translate input to English
        translated_input = GoogleTranslator(source='auto', target='en').translate(user_message)

        # 💬 Ask Groq AI (Llama-3 model)
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful crop disease expert and agriculture assistant."},
                {"role": "user", "content": translated_input},
            ]
        )

        ai_response_en = completion.choices[0].message.content

        # Translate back to target language
        translated_response = GoogleTranslator(source='en', target=target_lang).translate(ai_response_en)

        return jsonify({"response": translated_response})

    except Exception as e:
        print("❌ Chat error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 