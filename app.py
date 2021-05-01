# This app serve Machine Learning to the templates
from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
import numpy as np
import os
from joblib import load


# init app and class
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# Flask routes
# Homepage
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/analysis')
def analysis():
    return render_template('analysis.html')


@app.route('/ml')
def machine():
    return render_template('machine_learning.html', predictions=0.00)


@app.route('/tables')
def tables():
    return render_template('tables.html')


@app.route('/resources')
def resources():
    return render_template('resources.html')


@app.route('/about')
def about():
    return render_template('about.html')


"""
columns = 

    'total_volume', 'year', 'Albany', 'Atlanta', 'Baltimore/Washington',
    'Boise', 'Boston', 'Buffalo/Rochester', 'California', 'Charlotte',
    'Chicago', 'Cincinnati/Dayton', 'Columbus', 'Dallas/Ft. Worth',
    'Denver', 'Detroit', 'Grand Rapids', 'Great Lakes',
    'Harrisburg/Scranton', 'Hartford/Springfield', 'Houston',
    'Indianapolis', 'Jacksonville', 'Las Vegas', 'Los Angeles',
    'Louisville', 'Miami/Ft. Lauderdale', 'Midsouth', 'Nashville',
    'New Orleans/Mobile', 'New York', 'Northeast', 'Northern New England',
    'Orlando', 'Philadelphia', 'Phoenix/Tucson', 'Pittsburgh', 'Plains',
    'Portland', 'Raleigh/Greensboro', 'Richmond/Norfolk', 'Roanoke',
    'Sacramento', 'San Diego', 'San Francisco', 'Seattle', 'South Carolina',
    'South Central', 'Southeast', 'Spokane', 'St. Louis', 'Syracuse',
    'Tampa', 'Total U.S.', 'West', 'West Tex/New Mexico', '01', '02', '03',
    '04', '05', '06', '07', '08', '09', '10', '11', '12'

'total_volume', 'year', 'Atlanta', 'Baltimore/Washington', 'Boise',
       'Boston', 'Buffalo/Rochester', 'California', 'Charlotte', 'Chicago',
       'Cincinnati/Dayton', 'Columbus', 'Dallas/Ft. Worth', 'Denver',
       'Detroit', 'Grand Rapids', 'Great Lakes', 'Harrisburg/Scranton',
       'Hartford/Springfield', 'Houston', 'Indianapolis', 'Jacksonville',
       'Las Vegas', 'Los Angeles', 'Louisville', 'Miami/Ft. Lauderdale',
       'Midsouth', 'Nashville', 'New Orleans/Mobile', 'New York', 'Northeast',
       'Northern New England', 'Orlando', 'Philadelphia', 'Phoenix/Tucson',
       'Pittsburgh', 'Plains', 'Portland', 'Raleigh/Greensboro',
       'Richmond/Norfolk', 'Roanoke', 'Sacramento', 'San Diego',
       'San Francisco', 'Seattle', 'South Carolina', 'South Central',
       'Southeast', 'Spokane', 'St. Louis', 'Syracuse', 'Tampa', 'Total U.S.',
       'West', 'West Tex/New Mexico', '02', '03', '04', '05', '06', '07', '08',
       '09', '10', '11', '12'



"""
@app.route('/makePredictions', methods=['POST'])
def predictions():
    post_data = request.form 
    #load the model:
    model = load('finalized_model.sav')
    columns = ['total_volume', 'year', 
    # 'Albany', # Avoid perfect multicollinearity for all dummy variables notebook cell:19
    'Atlanta', 'Baltimore/Washington',
    'Boise', 'Boston', 'Buffalo/Rochester', 'California', 'Charlotte',
    'Chicago', 'Cincinnati/Dayton', 'Columbus', 'Dallas/Ft. Worth',
    'Denver', 'Detroit', 'Grand Rapids', 'Great Lakes',
    'Harrisburg/Scranton', 'Hartford/Springfield', 'Houston',
    'Indianapolis', 'Jacksonville', 'Las Vegas', 'Los Angeles',
    'Louisville', 'Miami/Ft. Lauderdale', 'Midsouth', 'Nashville',
    'New Orleans/Mobile', 'New York', 'Northeast', 'Northern New England',
    'Orlando', 'Philadelphia', 'Phoenix/Tucson', 'Pittsburgh', 'Plains',
    'Portland', 'Raleigh/Greensboro', 'Richmond/Norfolk', 'Roanoke',
    'Sacramento', 'San Diego', 'San Francisco', 'Seattle', 'South Carolina',
    'South Central', 'Southeast', 'Spokane', 'St. Louis', 'Syracuse',
    'Tampa', 'Total U.S.', 'West', 'West Tex/New Mexico', 
    #'01', # Avoid perfect multicollinearity for all dummy variables notebook cell:19
    '02', '03',
    '04', '05', '06', '07', '08', '09', '10', '11', '12']

    #Set to 0 every column in the model
    data = [0 for i in range(len(columns))]
    # format the volume as an integer
    data[0] = int(post_data['total_volume'])
    #Format year as integer
    data[0] = int(post_data['year'])
    # data[columns.index(post_data['year'])]=1
    
    # Set the column requested as True
    data[columns.index(post_data['region'])]=1
    data[columns.index(post_data['month'])]=1

    # input the the data to the model
    predictions = model.predict(np.array(data).reshape(1,-1))

    #round the predictions to get the needed format
    out = round(predictions[0],2) # 1.24

    # here we have two options 1: is to return the data to the route (this is good to work in JS)
    # 2nd: ours, set predictions as out, so and render the template. predictions is previously set as a variable in html.

    return render_template('machine_learning.html', predictions=out) #jsonify({"prediction": out})

@app.route('/data')
def data():
    df = pd.read_csv('Tableau/avocado-updated-2020.csv')
    out = []

    for index, row in df.iterrows():
        date = row['date']
        price = row['average_price']
        volume = row['total_volume']
        PLU_4046 = row['4046']
        PLU_4225 = row['4225']
        PLU_4770 = row['4770']
        total_bags = row['total_bags']
        type = row['type']
        year = row['year']
        geography = row['geography']
        out.append({
            'date': date,
            'price': price,
            'volume': volume,
            'PLU_4046': PLU_4046,
            'PLU_4225': PLU_4225,
            'PLU_4770': PLU_4770,
            'total_bags': total_bags,
            'type': type,
            'year': year,
            'geography':geography
        })
    
    return jsonify(out)

# @app.route('/table')
# def table():
#     df = pd.read_csv('Tableau/avocado-updated-2020.csv')
#     table = df.to_html()
#     return table


if __name__ == '__main__':
    app.run(debug=True)
