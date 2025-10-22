# disease_info.py

def get_disease_info(disease_name):
    """
    Returns solutions and preventive measures for the given plant disease.
    """

    disease_name = disease_name.strip()

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

    elif disease_name == 'Tomato___Early_blight':
        return {
            "disease": "Tomato Early Blight",
            "solutions": [
                "Spray fungicides like chlorothalonil or copper oxychloride.",
                "Remove infected leaves immediately.",
                "Rotate crops every 2-3 years."
            ],
            "preventive_measures": [
                "Avoid overhead watering.",
                "Provide good spacing between plants.",
                "Mulch soil to reduce spore spread."
            ]
        }

    elif disease_name == 'Tomato___Leaf_Mold':
        return {
            "disease": "Tomato Leaf Mold",
            "solutions": [
                "Use fungicides like mancozeb or chlorothalonil.",
                "Increase air circulation around plants."
            ],
            "preventive_measures": [
                "Avoid high humidity in greenhouses.",
                "Water plants at the base.",
                "Disinfect tools regularly."
            ]
        }

    elif disease_name == 'Potato___Late_blight':
        return {
            "disease": "Potato Late Blight",
            "solutions": [
                "Spray with copper-based fungicides.",
                "Destroy infected tubers and plants."
            ],
            "preventive_measures": [
                "Use certified seed tubers.",
                "Avoid overhead irrigation.",
                "Rotate crops every season."
            ]
        }

    elif "healthy" in disease_name:
        return {
            "disease": "Healthy Leaf",
            "solutions": ["No action needed — your plant is healthy!"],
            "preventive_measures": [
                "Continue regular monitoring.",
                "Maintain proper watering and nutrition."
            ]
        }

    else:
        return {
            "disease": "Unknown Disease",
            "solutions": ["Information not available yet."],
            "preventive_measures": ["Consult a local agricultural expert."]
        }
