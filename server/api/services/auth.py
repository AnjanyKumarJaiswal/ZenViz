from api.models.model_schema import UserItem , UserProfileItem
from flask import request , jsonify , session , abort
from config.appconfig import db  , redis_config

def signup():
    try:
        result = request.get_json()
        print("*** Server Side Data Received ***", result)
        
        fullName = result.get("fullName")
        email = result.get("email")
        password = result.get("password")
            
        existing_user = UserProfileItem.query.filter_by(email=email).first()
        
        if existing_user:
            abort(409)
            return jsonify({"error":"Email Already Exists please Login "}) , 400
        
        # hashed_password = bcrypt.generate_password_hash(password)
        
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
    

def get_current_user():
    user_id = session.get("user_id")
    
    print(user_id)
    
    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401
    
    user = UserItem.query.filter_by(id=user_id).first()
    
    return jsonify({"message":"User Authorized"}) , 200