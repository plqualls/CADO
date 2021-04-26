# This app serve Machine Learning to the templates
import numpy as np
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, desc, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
import pandas as pd

# Flask routes
app = Flask(__name__)


# Homepage
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/ml')
def machine():
    return render_template('machine_learning.html')

@app.route('/tables')
def tables():
    return render_template('tables.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/about')
def about():
    return render_template('about.html')





if __name__ == '__main__':
    app.run(debug=True)
