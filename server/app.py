from flask import Flask, redirect , session , jsonify , request
from flask_cors import CORS
from flask_session import Session
from config.appconfig import DB_config , redis_config , mailServiceConfig
from api.services.auth import login , signup , get_current_user ,logging_out_from_session , userForgetPassword , token_verification , new_passowrd 
from api.services.waitinglist import waitlist
from flask_bcrypt import Bcrypt
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail 

app = Flask(__name__)

CORS(
    app,
    supports_credentials=True,
    origins=["https://zen-viz.vercel.app", "https://www.zenviz.xyz"],
    allow_headers=["Content-Type", "Authorization"]
    )


bcrypt = Bcrypt(app)

DB_config(app=app)

redis_config(app=app)

Session(app=app)

mailServiceConfig(app=app)

mail = Mail(app=app)


serializer = URLSafeTimedSerializer(app.secret_key)


@app.route('/api/')
def testing():
    return "<a>hello this is working really fine<a/>"

@app.route("/api/auth/signup",methods=["POST"])
def user_signup():
    return signup()

@app.route('/api/auth/login', methods=['POST'])
def user_login():
    response = login()
    return response

@app.route('/api/auth/logout', methods=['POST'])
def user_logout():
    return logging_out_from_session()

@app.route("/api/auth/forget-password", methods=['POST'])
def forget_password():
    return userForgetPassword(serializer=serializer, mail=mail)

@app.route("/api/auth/verifying-token/<token>", methods=["POST"])
def verifying_change_pass_token(token):
    return token_verification(token=token , serializer=serializer)

@app.route("/api/auth/new-password", methods=["POST"])
def change_of_password():
    data = request.get_json()
    new_pass = data.get("newpassword")   
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
        
    return new_passowrd(token=token , new_pass=new_pass, serializer=serializer)

@app.route('/api/auth/callback/usersession', methods=['GET'])
def current_user():
    return get_current_user()
    

@app.route("/api/waitlist", methods=["POST"])
def emailwaitinglist():
    return waitlist()
    

if __name__ == "__main__":
    app.run(debug=True)