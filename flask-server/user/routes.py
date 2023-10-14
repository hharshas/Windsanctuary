from flask import Flask
from app import app
from user.models import User

@app.route('/api/data',methods = ['GET'])
def signup():
    return User.signup()