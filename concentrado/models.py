#from .app import db


class Clientes(db.Model):
    __tablename__ = 'clientes'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(64))
    tipo = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    abr = db.Column(db.String(10))
    monto = db.Column(db.Float)

class Cxc(db.Model):
    __tablename__ = 'cxc'

    no = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(8))
    cfdi = db.Column(db.Float)
    nombre = db.Column(db.String(10))
    monto = db.Column(db.Float)
    dias = db.Column(db.Float)
    fecha_pago = db.Column(db.String(8))


class Proveedores(db.Model):
    __tablename__ = 'proveedores'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(10))
    tipo = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    abr = db.Column(db.String(10))
    monto = db.Column(db.String(20))
    monto1 = db.Column(db.Float)

class Cxp(db.Model):
    __tablename__ = 'cxp'

    no = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(64))
    ref = db.Column(db.Float)
    fecha = db.Column(db.String(8))
    concepto = db.Column(db.String(64))
    monto = db.Column(db.Float)
    dias = db.Column(db.Float)
    fecha_pago = db.Column(db.String(8))

class Pp(db.Model):
    __tablename__ = 'pp'

    no = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(8))
    ingreso = db.Column(db.Float)
    egreso = db.Column(db.Float)
    saldo = db.Column(db.Float)
    


