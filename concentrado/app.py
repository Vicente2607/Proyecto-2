# Dependencies and Setup
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
#import requests
from sqlalchemy import create_engine
import scipy.stats as stats
import json
import psycopg2
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import render_template

###### Flask Section ######
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://rfwowglrwxbrod:8be4dbd9a83415977f4763405167339d4d8f4038b2bef25c1c243f087c5fd2f3@ec2-54-86-170-8.compute-1.amazonaws.com:5432/d2dkuhjl2vqhet"
# Remove tracking modifications
db = SQLAlchemy(app)

class Clientes(db.Model):
    __tablename__ = 'clientes'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    tipo = db.Column(db.String(10))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    abr = db.Column(db.String(10))
    monto = db.Column(db.Float)

class Cxc(db.Model):
    __tablename__ = 'cxc'

    no = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(8))
    cfdi = db.Column(db.Integer)
    nombre = db.Column(db.String(50))
    monto = db.Column(db.Float)
    dias = db.Column(db.Integer)
    fecha_pago = db.Column(db.String(8))


class Proveedores(db.Model):
    __tablename__ = 'proveedores'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250))
    tipo = db.Column(db.String(50))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    abr = db.Column(db.String(10))
    monto = db.Column(db.String(30))
    monto1 = db.Column(db.Float)

class Cxp(db.Model):
    __tablename__ = 'cxp'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250))
    ref = db.Column(db.Integer)
    fecha = db.Column(db.String(8))
    concepto = db.Column(db.String(90))
    monto = db.Column(db.Float)
    dias = db.Column(db.Integer)
    fecha_pago = db.Column(db.String(8))

class Pp(db.Model):
    __tablename__ = 'pp'

    fecha = db.Column(db.String(8), primary_key=True)
    ingreso = db.Column(db.Float)
    egreso = db.Column(db.Float)
    saldo = db.Column(db.Float)


#################################################
# Flask Routes
#################################################


@app.route("/")
#def welcome():
    #"""List all available api routes."""
    #return (
     #   f"Available Routes:<br/>"
      #  f"/api/v1.0/cxc<br/>"
       # f"/api/v1.0/cxp<br/>"
        #f"/api/v1.0/clientes<br/>"
        #f"/api/v1.0/proveedores<br/>"
        #f"/api/v1.0/pp"
    #)

def home():
    return render_template("cxp.html")
#################################################
@app.route("/api/v1.0/cxc")
def cxc():
    """Regresa la cuentas por cobrar"""
    
    cxc= Cxc.query.all()
    print("*************************************CXC*******************************************************")
    
    no=[]
    fecha=[]
    cfdi = []
    nombre = []
    monto = []
    dias = []
    fecha_pago = []
    i=0

    for cuenta in cxc:
        no.append(cuenta.no)
        fecha.append(cuenta.fecha)
        cfdi.append(cuenta.cfdi)
        nombre.append(cuenta.nombre)
        monto.append(cuenta.monto)
        dias.append(cuenta.dias)
        fecha_pago.append(cuenta.fecha_pago)


    cuentasxc = pd.DataFrame({
        "no":no,
        "fecha": fecha,
        "cfdi":cfdi,
        "nombre":nombre,
        "monto":monto,
        "dias":dias,
        "fecha_pago":fecha_pago
         })
    
    cuentasxc['fecha'] = pd.to_datetime(cuentasxc.fecha, dayfirst=True)
    cuentasxc['fecha_pago'] = pd.to_datetime(cuentasxc.fecha_pago, dayfirst=True)



    return cuentasxc.to_json(orient='table', date_format = 'iso', index = False)
#return cuentasxc.to_json(orient='table', date_format = 'iso', index = False)
    
#################################################
@app.route("/api/v1.0/cxp")
def cxp():

    cxp= Cxp.query.all()
    print("***************************************cxp*****************************************************")
    no=[]
    nombre=[]
    ref = []
    fecha = []
    concepto = []
    monto = []
    dias = []
    fecha_pago = []

    for cuentap in cxp:
        no.append(cuentap.no)
        nombre.append(cuentap.nombre)
        ref.append(cuentap.ref)
        fecha.append(cuentap.fecha)
        concepto.append(cuentap.concepto)
        monto.append(cuentap.monto)
        dias.append(cuentap.dias)
        fecha_pago.append(cuentap.fecha_pago)

    cuentasxp = pd.DataFrame({
        "no":no,
        "nomre": nombre,
        "ref":ref,
        "fecha":fecha,
        "concepto":concepto,
        "monto":monto,
        "dias":dias,
        "fecha_pago":fecha_pago
         })

    return cuentasxp.to_json(orient='table', date_format = 'iso', index = False)

#################################################
@app.route("/api/v1.0/clientes")
def clientes():

    clientes= Clientes.query.all()
    no =[]
    nombre =[]
    tipo =[]
    lat =[]
    lon =[]
    abr =[]
    monto =[]
    for cuenta in clientes:
        no.append(cuenta.no)
        nombre.append(cuenta.nombre)
        tipo.append(cuenta.tipo)
        lat.append(cuenta.lat)
        lon.append(cuenta.lon)
        abr.append(cuenta.abr)
        monto.append(cuenta.monto)   
    clientesdf = pd.DataFrame({
        "no" : no,
        "nombre" : nombre,
        "tipo" : tipo,
        "lat" : lat,
        "lon" : lon,
        "abr" : abr,
        "monto" : monto
        })

    return clientesdf.to_json(orient='table', date_format = 'iso', index = False)

#################################################
@app.route("/api/v1.0/proveedores")
def proveedores():
    Prove=Proveedores.query.all()
    print("**********************Proveedores**********************************************************************")
    no = []
    nombre = []
    tipo = []
    lat = []
    lon = []
    abr = []
    monto = []
    monto1 = []

    for cuenta in Prove:
        no.append(cuenta.no)
        nombre.append(cuenta.nombre)
        tipo.append(cuenta.tipo)
        lat.append(cuenta.lat)
        lon.append(cuenta.lon)
        abr.append(cuenta.abr)
        monto.append(cuenta.monto)
        monto1.append(cuenta.monto1)
    
    proveedores_df = pd.DataFrame({
        "no":no,
        "nombre":nombre,
        "tipo":tipo,
        "lat":lat,
        "lon":lon,
        "abr":abr,
        "monto":monto,
        "monto1":monto1
         })

    return proveedores_df.to_json(orient='table', date_format = 'iso', index = False)
#################################################
@app.route("/api/v1.0/pp")
def pp():

    Prop= Pp.query.all()
    print("**********************PP**********************************************************************")
    fecha = []
    ingreso =  []
    egreso =  []
    saldo = []

    for cuenta in Prop:
        fecha.append(cuenta.fecha)
        ingreso.append(cuenta.ingreso)
        egreso.append(cuenta.egreso)
        saldo.append(cuenta.saldo)
    
    Propa = pd.DataFrame({
        "fecha": fecha,
        "ingreso":ingreso,
        "egreso":egreso,
        "saldo":saldo
         })
    
    return Propa.to_json(orient='table', date_format = 'iso', index = False)
#################################################
if __name__ == '__main__':
    app.run(debug=True)