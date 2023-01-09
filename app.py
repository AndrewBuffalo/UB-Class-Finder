from flask import Flask
from flask import render_template, request, redirect, make_response 

app = Flask(__name__)

@app.route("/")
def index():
    return make_response(render_template('index.html'))


@app.route("/home")
def homepage():
    return make_response(render_template("homepage.html")) 