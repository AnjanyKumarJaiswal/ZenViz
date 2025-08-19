from config import appconfig
from flask import jsonify

def store_access_token(token, user_id):
    if appconfig.redis_client is None:
        raise Exception("Redis client is not initialized or visible in this scope.")
    
    try:
        res = appconfig.redis_client.setex(f"access_token:{token}", time=3600, value=token)
        if not res:
            raise Exception("Redis returned False on setex")
    except Exception as e:
        print("Redis Error:", e)
        raise Exception(f"Redis Error: {str(e)}")
    
def get_access_token(user_id):
    if appconfig.redis_client is None:
        raise jsonify({"Redis client is not initialised or visible in this scope"})
    try:
        res = appconfig.redis_client.get(name=user_id)
        if not res:
            return jsonify({"Redis returned False on getex"})
    except Exception as e:
        raise Exception(f"Redis Error: {e}")
    
    

