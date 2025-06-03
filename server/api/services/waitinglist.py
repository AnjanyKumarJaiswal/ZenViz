from api.models.model_schema import EmailWaitList
from config.appconfig import db 
from flask import request , abort , jsonify

def waitlist():
    try:
        data = request.get_json()
        
        email = data.get("email")
        
        existing_user = EmailWaitList.query.filter_by(email=email).first()
            
        if existing_user:
            abort(409)
            return jsonify({"error":"Email Already Exists please Login "}) , 400
        
        waiting_list_item = EmailWaitList(
            email=email
        )
        
        db.session.add(waiting_list_item)
        db.session.commit()
        return jsonify({"message":"Successfully Email sent for Waiting List"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Message":e}), 400