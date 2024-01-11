from flask import Flask,jsonify,request,redirect
import uuid
from passlib.hash import pbkdf2_sha256
import pymongo
from dotenv import load_dotenv
load_dotenv()
import os

client = pymongo.MongoClient(os.getenv("MONGO_DB_URI"))
db = client.user_login_system

class User:
    def start_session(self, user):
        print(user)
        if db.users.find_one({ "email": user['email'] }):
            print(jsonify({ "login": "true" ,"email" :  request.form.get('email') }))
            return jsonify({ "login": "true" ,"email" :  request.form.get('email') }), 400
        
        return jsonify({ "login": "false" }), 400


    
    def signup(self):
        # print(request.form)
        user = {
            "_id": uuid.uuid4().hex,
            "email": request.form.get('email'),
            "password": request.form.get('password')
        }

        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        if db.users.find_one({ "email": user['email'] }):
            return jsonify({ "error": "Email address already in use" }), 400

        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify({ "error": "Signup failed" }), 400
    
    def signout(self):
        return jsonify({"login" : "false"})
    
    def signin(self):
        user = db.users.find_one({"email": request.form.get('email')})
        print(user)
        print(pbkdf2_sha256.verify(request.form.get('password'), user['password']))
        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
    
        return jsonify({ "error": "Invalid login credentials" }), 401