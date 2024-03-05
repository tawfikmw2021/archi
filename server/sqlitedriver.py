from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.orm import class_mapper
from typing import List

db = SQLAlchemy()
def adddb(app:Flask):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    db.init_app(app)
    with app.app_context():
        db.create_all()

def to_dict(model):
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)
    
class Plan(db.Model):
    __tablename__ ="plans"
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(200))
    time = db.Column(db.String(100))
    children: Mapped[List["PlanObject"]] = relationship()
    def toJson(self, verbose=False):
        res =  {"id" : self.id, "name":self.name, "time":self.time}
        if(verbose) : res["children"] = [c.toJson() for c in self.children]
        return res
    
    
class PlanObject(db.Model):
    __tablename__ ="objects"
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(200))
    parent_id: Mapped[int] = mapped_column(ForeignKey("plans.id"))
    properties = db.Column(db.String(10000))

    def toJson(self):
        return {"id" : self.id, "name":self.name, "properties": dict([kv.split("=") for kv in self.properties.split(";") if kv != ""])}

class Query(db.Model):
    __tablename__ ="queries"
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    time = db.Column(db.String(100), unique=True)
    text1 = db.Column(db.String(10000))
    text2 = db.Column(db.String(10000))

from datetime import datetime


def saveObject(tablename, obj):
    savedObj =  eval(tablename).query.filter_by(id=obj["id"]).first()
    if(savedObj == None):
        savedObj = eval(tablename)(obj)
    
    db.session.add(savedObj)
    db.session.commit()
    return to_dict(obj)

def getObject(tablename, filter):
    obj =  eval(tablename).query.filter_by(**filter).first()
    res = to_dict(obj) 
    return res

def getObjects(tablename, filter):
    objs =  eval(tablename).query.filter_by(**filter)
    res = [to_dict(obj) for obj in objs] 
    return res



