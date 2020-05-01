import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

############################################
# Database Setup
##############################################
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)


##engine = create_engine("sqlite:///ProgramadePagos.sql")
# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(engine, reflect=True)
# Save reference to the table
#DailyBalance = Base.classes.saldo
#################################################
# Flask Setup
#################################################

#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/ProgramadePagos<br/>"
        f"/api/v1.0/Clientes<br/>"
        f"/api/v1.0/mapadeclientes<br/>" 
    )
@app.route("/api/v1.0/ProgramadePagos")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return ingreso"""
    # Query all balance
    results = session.query(DailyBalance.saldo).all()
    session.close()
    # Convert list of tuples into normal list
    all_ingreso = list(np.ravel(results))
    return jsonify(all_saldo)
@app.route("/api/v1.0/Cientes")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return egreso"""
    # Query all balance
    results = session.query(DailyBalance.ingreso).all()
    session.close()
    # Convert list of tuples into normal list
    all_egreso = list(np.ravel(results))
    return jsonify(all_egreso)
@app.route("/api/v1.0/mapadeclientes")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return balance"""
    # Query all balance
    results = session.query(mapadeclientes).all()
    session.close()
    # Convert list of tuples into normal list
    all_egreso = list(np.ravel(results))
    return mapadeclientes
# @app.route("/api/v1.0/cliente/<nombre>")
# def customers(nombre):
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#     """Return the balance data including the ingreso, egreso, and fecha of each customer"""
#     # Query all customers
#     results = session.query(DailyBalance.fecha, DailyBalance.ingreso, DailyBalance.egreso, DailyBalance.saldo).filter().all()
#     session.close()
#     # Create a dictionary from the row data and append to a list of all_balance
#     all_balance = []
#     for ingreso, egreso, saldo in results:
#         balance_dict = {}
#         balance_dict["ingreso"] = ingreso
#         balance_dict["egreso"] = egreso
#         balance_dict["saldo"] = saldo
#         all_balance.append(balance_dict)
#     return jsonify(all_balance)
if __name__ == '__main__':
    app.run(debug=True)
#Collapse








