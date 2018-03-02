"""
    First iteration of the new backend for JAMX.io page
"""
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

