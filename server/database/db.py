from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

def initialised_DB(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    # app.config['SQLALCHEMY_DATABASE_URI'] = mysql_config
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  

    # db.init_app(app)
    # Migrate(app, db)
    
    try:
        print("Initialising SQL Database....")
        db.init_app(app)
        print("Now Initialising Migration of the Database...")
        Migrate(app, db)
        print("Migrattion Done....")
    except:
        print("An Error Occured While Initialising Database")