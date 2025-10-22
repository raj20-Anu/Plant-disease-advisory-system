# main.py
from flask import Flask, request, jsonify, render_template
import keras
import numpy as np
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
from disease_info import get_disease_info


# Initialize Flask app
app = Flask(__name__)

# Load the trained model
model = keras.layers.TFSMLayer("exported_model", call_endpoint="serving_default")


# ------------------------------
# 2️. Load a sample leaf image
# ------------------------------

img_path = r"train/pe_per.jpg"  # raw string to avoid path issues
img = image.load_img(img_path, target_size=(224,224))
img_array = np.expand_dims(image.img_to_array(img), axis=0)  # do NOT divide by 255
img_array = img_array / 255.0
# ------------------------------
# 3️. Predict
# ------------------------------
pred = model(img_array)['dense_2'].numpy()  # extract tensor as numpy array
pred_class_idx = np.argmax(pred)
confidence = pred[0][pred_class_idx] * 100

# ------------------------------
# 4️. Class names
# ------------------------------

# Define class names

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
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get uploaded file
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']

    # Read and preprocess image
    img = Image.open(io.BytesIO(file.read())).resize((224, 224))
    img_array = np.expand_dims(image.img_to_array(img), axis=0)  # do NOT divide by 255

    # Run prediction
    pred = model(img_array)['dense_2'].numpy()
    pred_class_idx = np.argmax(pred)
    confidence = float(pred[0][pred_class_idx] * 100)


    disease_info = get_disease_info(class_names[pred_class_idx])
    # Return JSON response
    return jsonify({
        "predicted_class": class_names[pred_class_idx],
        "confidence": confidence,
        "disease_info": disease_info
    })

# Run Flask app with live reload
from livereload import Server
if __name__ == "__main__":
    app.run(debug=False)