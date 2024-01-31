from flask import Flask, render_template, request, make_response, jsonify, session, abort
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import timedelta

from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# initialize app
app = Flask(__name__)

# app configuration
app = Flask(__name__)
app.secret_key = b'\xb2_8\xcc\xfc\xec3n\xc5\x7f\x01-\xdal[\xc7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///safaris.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = b'\xb2_8\xcc\xfc\xec3n\xc5\x7f\x01-\xdal[\xc7'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

app.json.compact = False

# initialize database
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

bcrypt = Bcrypt(app)
bcrypt.init_app(app)
api = Api(app)

jwt = JWTManager(app)

migrate = Migrate(app, db)
db.init_app(app)
CORS(app)