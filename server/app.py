from flask import Flask
from flask_cors import CORS
from database.db import initialised_DB
from api.services.auth import login , signup

app = Flask(__name__)

CORS(app)

initialised_DB(app=app)

@app.route('/api/')
def testing():
    return "<a>hello this is working really fine<a/>"

@app.route("/api/auth/signup",methods=["POST"])
def user_signup():
    return signup()

@app.route('/api/auth/login', methods=['POST'])
def user_login():
    return login()

if __name__ == "__main__":
    app.run(debug=True)