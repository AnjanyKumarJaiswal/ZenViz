from api.models.model_schema import UserItem , UserProfileItem
from flask import request , jsonify
from database.db import db

def signup():
    try:
        result = request.get_json()
        print("*** Server Side Data Received ***", result)
        
        fullName = result["data"]["fullName"]
        email = result["data"]["email"]
        password = result["data"]["password"]
            
        existing_user = UserProfileItem.query.filter_by(email=email).first()
        if existing_user:
                return jsonify({"error":"Email Already Exists please Login "}) , 400
                
                    
        signedUp_user = UserProfileItem(
                    fullName = fullName,
                    email = email,
                    password = password
                )
                
        db.session.add(signedUp_user)
        db.session.commit()
            
        new_login = UserItem(
                signupid= signedUp_user.id,
                email=email,
                password=password           
            )
            
        db.session.add(new_login)
        db.session.commit()
            
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
            
        login_entry = UserItem.query.filter_by(email=email).first()
        if not login_entry:
                return jsonify({"error": "Invalid email or password"}), 401
            
        if login_entry.password != password:
                return jsonify({"error":"Incorrect Email or Password"}) , 401
            
        user_profile = login_entry.profile

        return jsonify({
                "message": "User Logged in SuccessFully",
                "user": {
                    "id": user_profile.id,
                    "fullName": user_profile.fullName,
                    "email": user_profile.email
                }
            }), 200

    except Exception as e:
        print("an error occurred!!!!")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    