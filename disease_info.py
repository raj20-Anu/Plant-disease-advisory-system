# disease_info.py

def get_disease_info(disease_name):
    """
    Returns solutions and preventive measures for the given plant disease.
    """
    disease_name = disease_name.strip()

    # Apple
    if disease_name == 'Apple___Apple_scab':
        return {
            "disease": "Apple Scab",
            "solutions": [
                "Remove and destroy infected leaves and fruit.",
                "Apply fungicides like captan or mancozeb early in the season.",
                "Prune trees to improve air circulation."
            ],
            "preventive_measures": [
                "Choose resistant apple varieties.",
                "Avoid overhead irrigation.",
                "Clean up fallen leaves after autumn."
            ]
        }
    elif disease_name == 'Apple___Black_rot':
        return {
            "disease": "Apple Black Rot",
            "solutions": [
                "Remove cankers and infected fruits.",
                "Use fungicides such as thiophanate-methyl or copper-based sprays."
            ],
            "preventive_measures": [
                "Prune out dead wood regularly.",
                "Avoid tree wounds which allow fungi entry.",
                "Maintain tree vigor with proper nutrition."
            ]
        }
    elif disease_name == 'Apple___Cedar_apple_rust':
        return {
            "disease": "Cedar Apple Rust",
            "solutions": [
                "Remove infected leaves and fruit.",
                "Apply fungicides like myclobutanil or mancozeb."
            ],
            "preventive_measures": [
                "Remove nearby juniper hosts.",
                "Plant resistant apple varieties.",
                "Prune trees for better airflow."
            ]
        }
    elif disease_name == 'Apple___healthy':
        return {
            "disease": "Healthy Apple Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Blueberry
    elif disease_name == 'Blueberry___healthy':
        return {
            "disease": "Healthy Blueberry Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Monitor regularly.",
                "Provide balanced fertilizer and water as needed."
            ]
        }

    # Cherry
    elif disease_name == 'Cherry_(including_sour)___Powdery_mildew':
        return {
            "disease": "Cherry Powdery Mildew",
            "solutions": [
                "Apply sulfur-based fungicides.",
                "Prune infected shoots.",
                "Increase airflow around plants."
            ],
            "preventive_measures": [
                "Plant resistant varieties.",
                "Avoid overhead watering.",
                "Ensure good spacing between plants."
            ]
        }
    elif disease_name == 'Cherry_(including_sour)___healthy':
        return {
            "disease": "Healthy Cherry Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Corn (Maize)
    elif disease_name == 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot':
        return {
            "disease": "Corn Gray Leaf Spot",
            "solutions": [
                "Apply fungicides such as azoxystrobin or propiconazole.",
                "Remove and destroy infected plant debris."
            ],
            "preventive_measures": [
                "Rotate crops.",
                "Plant resistant corn varieties.",
                "Avoid excessive nitrogen fertilization."
            ]
        }
    elif disease_name == 'Corn_(maize)___Common_rust_':
        return {
            "disease": "Corn Common Rust",
            "solutions": [
                "Apply fungicides like mancozeb or propiconazole.",
                "Remove severely infected leaves."
            ],
            "preventive_measures": [
                "Plant resistant hybrids.",
                "Maintain proper spacing for airflow.",
                "Rotate crops annually."
            ]
        }
    elif disease_name == 'Corn_(maize)___Northern_Leaf_Blight':
        return {
            "disease": "Corn Northern Leaf Blight",
            "solutions": [
                "Apply fungicides such as chlorothalonil or azoxystrobin.",
                "Remove infected leaves and debris."
            ],
            "preventive_measures": [
                "Plant resistant varieties.",
                "Rotate crops.",
                "Avoid overhead irrigation."
            ]
        }
    elif disease_name == 'Corn_(maize)___healthy':
        return {
            "disease": "Healthy Corn Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Grape
    elif disease_name == 'Grape___Black_rot':
        return {
            "disease": "Grape Black Rot",
            "solutions": [
                "Remove infected fruits and leaves.",
                "Spray fungicides such as mancozeb or captan."
            ],
            "preventive_measures": [
                "Plant resistant grape varieties.",
                "Prune for better airflow.",
                "Sanitize pruning tools."
            ]
        }
    elif disease_name == 'Grape___Esca_(Black_Measles)':
        return {
            "disease": "Grape Esca (Black Measles)",
            "solutions": [
                "Remove and destroy infected wood.",
                "Apply systemic fungicides during dormancy."
            ],
            "preventive_measures": [
                "Avoid injuring vines.",
                "Maintain proper nutrition and irrigation.",
                "Prune during dry conditions."
            ]
        }
    elif disease_name == 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)':
        return {
            "disease": "Grape Leaf Blight",
            "solutions": [
                "Apply copper-based fungicides or mancozeb.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Plant resistant varieties.",
                "Ensure proper spacing and airflow.",
                "Avoid wetting foliage."
            ]
        }
    elif disease_name == 'Grape___healthy':
        return {
            "disease": "Healthy Grape Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Proper watering and nutrition."
            ]
        }

    # Orange
    elif disease_name == 'Orange___Haunglongbing_(Citrus_greening)':
        return {
            "disease": "Citrus Greening (HLB)",
            "solutions": [
                "No cure available. Remove and destroy infected trees.",
                "Control psyllid vectors with insecticides."
            ],
            "preventive_measures": [
                "Plant certified disease-free saplings.",
                "Monitor trees regularly.",
                "Use insect control nets or barriers."
            ]
        }

    # Peach
    elif disease_name == 'Peach___Bacterial_spot':
        return {
            "disease": "Peach Bacterial Spot",
            "solutions": [
                "Apply copper sprays.",
                "Remove infected leaves and fruit."
            ],
            "preventive_measures": [
                "Plant resistant varieties.",
                "Avoid overhead watering.",
                "Sanitize tools."
            ]
        }
    elif disease_name == 'Peach___healthy':
        return {
            "disease": "Healthy Peach Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Pepper
    elif disease_name == 'Pepper,_bell___Bacterial_spot':
        return {
            "disease": "Bell Pepper Bacterial Spot",
            "solutions": [
                "Use copper-based bactericides weekly.",
                "Remove infected leaves and fruit."
            ],
            "preventive_measures": [
                "Plant certified disease-free seeds.",
                "Rotate crops annually.",
                "Avoid overhead watering."
            ]
        }
    elif disease_name == 'Pepper,_bell___healthy':
        return {
            "disease": "Healthy Bell Pepper Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Potato
    elif disease_name == 'Potato___Early_blight':
        return {
            "disease": "Potato Early Blight",
            "solutions": [
                "Apply fungicides like chlorothalonil or mancozeb.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Use certified seed tubers.",
                "Avoid overhead irrigation.",
                "Rotate crops annually."
            ]
        }
    elif disease_name == 'Potato___Late_blight':
        return {
            "disease": "Potato Late Blight",
            "solutions": [
                "Spray copper-based fungicides.",
                "Destroy infected tubers and plants."
            ],
            "preventive_measures": [
                "Use certified seed tubers.",
                "Avoid overhead irrigation.",
                "Rotate crops every season."
            ]
        }
    elif disease_name == 'Potato___healthy':
        return {
            "disease": "Healthy Potato Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Monitor regularly.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Raspberry
    elif disease_name == 'Raspberry___healthy':
        return {
            "disease": "Healthy Raspberry Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Soybean
    elif disease_name == 'Soybean___healthy':
        return {
            "disease": "Healthy Soybean Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Squash
    elif disease_name == 'Squash___Powdery_mildew':
        return {
            "disease": "Squash Powdery Mildew",
            "solutions": [
                "Apply sulfur-based fungicides.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Plant resistant varieties.",
                "Ensure good airflow.",
                "Avoid overhead watering."
            ]
        }

    # Strawberry
    elif disease_name == 'Strawberry___Leaf_scorch':
        return {
            "disease": "Strawberry Leaf Scorch",
            "solutions": [
                "Remove infected leaves.",
                "Apply appropriate bactericides."
            ],
            "preventive_measures": [
                "Avoid overhead watering.",
                "Plant resistant varieties.",
                "Maintain proper spacing and airflow."
            ]
        }
    elif disease_name == 'Strawberry___healthy':
        return {
            "disease": "Healthy Strawberry Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    # Tomato
    elif disease_name == 'Tomato___Bacterial_spot':
        return {
            "disease": "Tomato Bacterial Spot",
            "solutions": [
                "Apply copper sprays or bactericides.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Avoid overhead watering.",
                "Rotate crops annually.",
                "Mulch around plants."
            ]
        }
    elif disease_name == 'Tomato___Early_blight':
        return {
            "disease": "Tomato Early Blight",
            "solutions": [
                "Spray fungicides like chlorothalonil or copper oxychloride.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Avoid overhead watering.",
                "Provide good spacing.",
                "Mulch soil to reduce spore spread."
            ]
        }
    elif disease_name == 'Tomato___Late_blight':
        return {
            "disease": "Tomato Late Blight",
            "solutions": [
                "Spray fungicide with mancozeb or copper.",
                "Destroy infected plants."
            ],
            "preventive_measures": [
                "Use disease-free seeds.",
                "Avoid wetting foliage.",
                "Rotate crops."
            ]
        }
    elif disease_name == 'Tomato___Leaf_Mold':
        return {
            "disease": "Tomato Leaf Mold",
            "solutions": [
                "Apply fungicides like mancozeb or chlorothalonil.",
                "Increase airflow."
            ],
            "preventive_measures": [
                "Avoid high humidity.",
                "Water at the base.",
                "Disinfect tools regularly."
            ]
        }
    elif disease_name == 'Tomato___Septoria_leaf_spot':
        return {
            "disease": "Tomato Septoria Leaf Spot",
            "solutions": [
                "Spray fungicides like chlorothalonil or mancozeb.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Avoid overhead watering.",
                "Rotate crops.",
                "Ensure proper spacing."
            ]
        }
    elif disease_name == 'Tomato___Spider_mites Two-spotted_spider_mite':
        return {
            "disease": "Tomato Spider Mites",
            "solutions": [
                "Spray insecticidal soap or neem oil.",
                "Introduce natural predators."
            ],
            "preventive_measures": [
                "Avoid excessive nitrogen fertilization.",
                "Keep plants well-watered.",
                "Inspect leaves regularly."
            ]
        }
    elif disease_name == 'Tomato___Target_Spot':
        return {
            "disease": "Tomato Target Spot",
            "solutions": [
                "Spray fungicides such as chlorothalonil.",
                "Remove infected leaves."
            ],
            "preventive_measures": [
                "Avoid overhead irrigation.",
                "Rotate crops.",
                "Proper plant spacing."
            ]
        }
    elif disease_name == 'Tomato___Tomato_Yellow_Leaf_Curl_Virus':
        return {
            "disease": "Tomato Yellow Leaf Curl Virus",
            "solutions": [
                "Remove infected plants.",
                "Control whitefly vectors with insecticides."
            ],
            "preventive_measures": [
                "Use virus-free seeds.",
                "Introduce natural predators of whiteflies.",
                "Maintain good garden hygiene."
            ]
        }
    elif disease_name == 'Tomato___Tomato_mosaic_virus':
        return {
            "disease": "Tomato Mosaic Virus",
            "solutions": [
                "Remove infected plants.",
                "Sanitize tools and hands after handling infected plants."
            ],
            "preventive_measures": [
                "Use virus-free seeds.",
                "Avoid plant injury.",
                "Maintain proper spacing and hygiene."
            ]
        }
    elif disease_name == 'Tomato___healthy':
        return {
            "disease": "Healthy Tomato Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Regular monitoring.",
                "Proper watering and nutrition."
            ]
        }

    # Default case
    else:
        return {
            "disease": "Unknown Disease",
            "solutions": ["Information not available yet."],
            "preventive_measures": ["Consult a local agricultural expert."]
        }
