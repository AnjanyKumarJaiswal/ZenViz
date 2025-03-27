from api.models.model_schema import UserItem
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
        
        user_loggedin = UserItem(
            email = email,
            password = password
        )
        
        print("This is the data that will go in the db", user_loggedin)
        
        db.session.add(user_loggedin)
        db.session.commit()
        return jsonify({"message": "User Logged in SuccessFully"}), 200

    except Exception as e:
        print("an error occurred!!!!")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500