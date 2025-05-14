from api.models.model_schema import UserItem , UserProfileItem
from flask import request , jsonify , session , abort
from config.appconfig import db  
from flask_mail import  Message
from dotenv import load_dotenv
import os

load_dotenv()

def signup():
    try:
        result = request.get_json()
        print("*** Server Side Data Received ***", result)
        
        username = result.get("username")
        fullName = result.get("fullName")
        email = result.get("email")
        password = result.get("password")
            
        existing_user = UserProfileItem.query.filter_by(email=email).first()
        
        if existing_user:
            abort(409)
            return jsonify({"error":"Email Already Exists please Login "}) , 400
        
        # hashed_password = bcrypt.generate_password_hash(password)
        
        signedUp_user = UserProfileItem(
            username = username,
            fullName = fullName,
            email = email,
            password = password
        )
                
        db.session.add(signedUp_user)
        db.session.commit()
            
        new_login = UserItem(
            signupid= signedUp_user.id,
            username=username,
            email=email,
            password=password           
        )
            
        db.session.add(new_login)
        db.session.commit()
        
        session["new_user_id"] = signedUp_user.id
        session.modified = True
            
        return jsonify({"message": "User Logged in SuccessFully"}), 200
      
    except Exception as e:
        print("an error occurred!!!!")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
     
     
def login():
    try:
        data = request.get_json()
        print("*** Server Side Data Received ***", data)
            
        if not data:
                return jsonify({"error": "No data provided"}), 400
            
        email = data.get('email')
        password = data.get('password')
            
        if not all([email, password]):
                return jsonify({"error": "Missing required fields"}), 400
            
        user_login = UserItem.query.filter_by(email=email).first()
        
        if not user_login:
                return jsonify({"error": "Unauthorized"}), 401
            
        if user_login.password != password:
                return jsonify({"error":"Unauthorized"}) , 401
        
        session["user_id"] = user_login.id    
        
        session.modified=True
        
        print("Session after setting:", session.get("user_id"))

        return jsonify({"message": "User Logged in SuccessFully and Session Created"}), 200

    except Exception as e:
        print("an error occurred!!!!")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
def logging_out_from_session():
    return session.pop("user_id")


def generate_OTP_token(serializer, email: str):
    return serializer.dumps(email, salt="email-confirm")

def token_verification(token, serializer,  exp=2000):
    try:
        email = serializer.loads(token, salt="email-confirm", max_age=exp)
        return email
    except Exception as e:
        return jsonify({"error message": e}), 400

def userForgetPassword(serializer , mail):
    
    try:
        email = request.get_json()
        
        if not email:
            return jsonify({"message":"No email provided by the user"}), 400
        
        userEmail = email.get("email")
        
        user = UserItem.query.filter_by(email=userEmail).first()
        
        token = generate_OTP_token(userEmail)
        
        Subject = "Reset your Password for your ZenViz Acc"
        
        reset_url = f"{os.getenv('FRONTEND_URL')}/auth/reset-password?token={token}"
        
        verification_email = f"""
            Hi {user.username},

            We received a request to reset your ZenViz account password.

            Click the link below to reset your password:

            {reset_url}

            If you didn’t request this, you can ignore this email.

            Thanks,
            The ZenViz Team
            """
        
        msg = Message(
            sender= os.getenv("AWS_EMAIL_PROVIDER"),
            recipients=[userEmail],
            subject=Subject,
            body=verification_email
        )
        
        mail.send(msg)
        
        return jsonify({'message': 'Password reset email sent'}), 200
        
    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({"message": "Internal Server Error"}), 500
    
    
        

def get_current_user():
    user_id = session.get("user_id")
    
    print(user_id)
    
    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401
    
    user = UserItem.query.filter_by(id=user_id).first()
    
    data = {
        "id" : user.id,
        "username": user.username,
        "email" : user.email, 
    }
    
    print(data)
    
    return jsonify({"message":"User Authorized" , "data" : data}) , 200