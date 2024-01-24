from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db

app = Flask(__name__)
app.secret_key = b'\xb2_8\xcc\xfc\xec3n\xc5\x7f\x01-\xdal[\xc7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///safaris.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
api = Api(app)

migrate = Migrate(app, db)
db.init_app(app)


@app.route('/', methods=['get'])
def home():
    return render_template('flask_index.html')


if __name__ == '__main__':
    app.run(debug=True)