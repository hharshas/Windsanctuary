from flask import Flask, jsonify, request, json
from io import BytesIO
from flask_cors import CORS

# from user import routes
from user.models import User,UserImage

app = Flask(__name__)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})


# def predict_terrain(image):




@app.route('/url_route', methods=['POST'])
def upload_file():
    d = {}
    try:
        file = request.files['file_from_react']
        
        filename = file.filename
        print(f"Uploading file {filename}")
        file_bytes = file.read()
        file_content = BytesIO(file_bytes).readlines()
        print(file_content)
        print(": harsh")
        print(file)
        # result=predict_terrain(file_content)
        # result=result+1
        d['status'] = 1

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)

@app.route('/api/signup',methods = ['POST'])
def signup():
    return User().signup()

# @app.route('/api/data',methods = ['POST'])
# def get_data():
#     data = {
#         "message":"Hello this is api end point"
#     }
    # return jsonify(data)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug=True)




# https://github.com/AIZOOTech/flask-object-detection