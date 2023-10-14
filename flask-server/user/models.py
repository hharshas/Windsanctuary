from flask import Flask,jsonify,request


class User:
    def signup(self):
        user = {
            "_id": "",
            "email": request.form.get('email'),
            "password": request.form.get('password')
        }
        print(jsonify(user))
        return jsonify(user),200
    
class UserImage:
 def Model(self):
     user = {
         "body": request.form.get('body')
     }
     print(jsonify(user))
     return jsonify(user),200