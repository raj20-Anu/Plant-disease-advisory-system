import tensorflow as tf

# Load your old SavedModel
model = tf.keras.models.load_model("exported_model")

# Save in Keras 3 format
model.save("./exported_model.keras")
