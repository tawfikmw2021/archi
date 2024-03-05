
from flask import Flask, send_from_directory, request
from flask_cors import CORS
from sqlitedriver import  adddb, saveObject, getObject, getObjects
app = Flask(__name__)
CORS(app)
adddb(app)


import os
from datetime import datetime

@app.post("/entity/<tablename>")
def db_post():
    saveObject(request.json)

@app.get("/entity/<tablename>/<id>")
def db_get(tablename, id):
    getObject(tablename, {"id":id})

@app.get("/entity/<tablename>")
def db_get_many(tablename):
    getObject(tablename, request.args)


@app.get("/static/<path>")
def getPath(path):
    if(path == ""):
        return send_from_directory("static", "index.html")
    if(os.path.exists(os.path.join("static", path))):
        return send_from_directory("static", path)
    
app.run("localhost", port=8081)

