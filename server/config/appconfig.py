from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
import redis
import secrets
from dotenv import load_dotenv
import os

load_dotenv()

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

def DB_config(app):
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
    app.config["SQLALCHEMY_ECHO"] = True
    
    try:
        print("Initialising SQL Database....")
        db.init_app(app)
        print("Now Initialising Migration of the Database...")
        Migrate(app, db)
        print("Migrattion Done....")
    except:
        print("An Error Occured While Initialising Database")
        
def redis_config(app):
    app.config["SECRET_KEY"] = secrets.token_hex(32)
    
    app.config["SESSION_TYPE"] = "redis"
    
    app.config["SESSION_PERMANENT"] = False
    
    app.config["SESSION_USE_SIGNER"] = True
    
    app.config["SESSION_KEY_PREFIX"] = "session:"
    
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    
    app.config["SESSION_COOKIE_NAME"] = "my_session"
    
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    
    app.config["SESSION_COOKIE_SECURE"] = False 
    
    app.config["SESSION_REDIS"] = redis.Redis(
        host="localhost",
        port=6379, 
        decode_responses=False
        )