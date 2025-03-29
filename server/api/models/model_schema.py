from database.db import db
from sqlalchemy.orm import Mapped , mapped_column , relationship
import sqlalchemy as sa 
from sqlalchemy import String , Integer , DateTime
from datetime import datetime

class UserItem(db.Model):
    __tablename__="user"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)
    email: Mapped[str] = mapped_column(String(30),  nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(12), nullable=False , unique=True)
    
    profile = relationship("UserProfileItem", back_populates="user", uselist=False)
    
    def __repr__(self):
        return f"User Email:{self.email}"
    
class UserProfileItem(db.Model):
    __tablename__ = "userProfile"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)
    loginid: Mapped[int] = mapped_column(Integer, sa.ForeignKey("user.id"))
    username: Mapped[str] = mapped_column(String(12), unique=True)
    fullName: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(30),  nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(12), nullable=False , unique=True)
    
    user = relationship("UserItem", back_populates="profile")
    
    def __repr__(self):
        return f"Your Full Name :{self.fullName}"
    