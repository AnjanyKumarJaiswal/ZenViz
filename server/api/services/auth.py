from api.models.model_schema import UserLoginItem
from flask import request , jsonify
from database.db import db

def user_login():
    try:
        data = request.get_json()
        print("*** Server Side Data Received ***", data)
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        email = data.get('email')
        password = data.get('password')
        
        print("This is the email", email)
        print("This is the Password", password)
        
        if not all([email, password]):
            return jsonify({"error": "Missing required fields"}), 400
        
        user_loggedin = UserLoginItem(
            email = email,
            pasword = password
        )
        
        db.session.add(user_loggedin)
        db.session.commit()
        return jsonify({"message": "User Logged in SuccessFully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500