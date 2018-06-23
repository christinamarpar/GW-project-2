import numpy as np
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/maternal_data.sqlite", echo=False)

Base = automap_base()
Base.prepare(engine, reflect=True)
MatStats = Base.classes.maternal_stats

session = Session(engine)

#################################################
# Routes
#################################################
@app.route("/")
def index():
    return render_template('index.html')

@app.route('/maternal_data')
def maternal_data():
    results = session.query(MatStats).statement 
    results_df = pd.read_sql_query(results, session.bind)
    results_df.set_index('id', inplace=True)
    return results_df.to_json(orient='records')

if __name__ == "__main__":
    app.run(debug=True)
