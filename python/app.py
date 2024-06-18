from flask import Flask, render_template, request, jsonify
import os
from PIL import Image
import io
from model import get_caption_model, generate_caption
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
     r"/": {"origins": "http://localhost:3000"}}, expose_headers="*")
CORS(app)
# Set the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Create a global variable to hold the model instance
caption_model = get_caption_model()


def predict(image_path):
    captions = []
    pred_caption = generate_caption(image_path, caption_model)
    captions.append(pred_caption)

    # for _ in range(4):
    #     pred_caption = generate_caption(
    #         image_path, caption_model, add_noise=True)
    #     if pred_caption not in captions:
    #         captions.append(pred_caption)

    return captions


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        if file:
            # Save the file to the upload folder
            filename = os.path.join(app.config['UPLOAD_FOLDER'], 'tmp.jpg')
            file.save(filename)

            # Perform prediction using the uploaded image
            captions = predict(filename)

            # Remove the uploaded image
            os.remove(filename)

            # render_template('index.html', captions=captions,
            #                 img_path='tmp.jpg')
            return captions

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
