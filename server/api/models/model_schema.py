from config.appconfig import db
from sqlalchemy.orm import Mapped , mapped_column , relationship
import sqlalchemy as sa 
from sqlalchemy import String , Integer , DateTime
from datetime import datetime
from uuid import uuid4

class UserProfileItem(db.Model):
    __tablename__ = "userProfile"
    id: Mapped[str] = mapped_column(sa.String(32), primary_key=True, unique=True , default= lambda: uuid4().hex)
    username: Mapped[str] = mapped_column(String(12), nullable=True ,unique=True)
    fullName: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(30),  nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(12), nullable=False , unique=False)
    
    user = relationship("UserItem", back_populates="profile", uselist=False)
    
    def __repr__(self):
        return f"Your Full Name :{self.fullName}"

class UserItem(db.Model):
    __tablename__="user"
    
    id: Mapped[str] = mapped_column(sa.String(32), primary_key=True, unique=True , default=lambda: uuid4().hex)
    signupid: Mapped[str] = mapped_column(sa.String(32), sa.ForeignKey("userProfile.id"))
    email: Mapped[str] = mapped_column(String(30),  nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(12), nullable=False , unique=False)
    
    profile = relationship("UserProfileItem", back_populates="user")
    
    def __repr__(self):
        return f"User Email:{self.email}"
    
    