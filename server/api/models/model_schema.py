from database.db import db
from sqlalchemy.orm import Mapped , mapped_column
from sqlalchemy import String , Integer , DateTime
from datetime import datetime

class UserLoginItem(db.Model):
    __tablename__="user_loggedin"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)
    email: Mapped[str] = mapped_column(String(30),  nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(12), nullable=False , unique=True)
    
    def __repr__(self):
        return f"User Email:{self.email}"
    