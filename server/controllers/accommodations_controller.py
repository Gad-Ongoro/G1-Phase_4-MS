from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Accommodation
from config import db, bcrypt, create_access_token

accommodation_bp = Blueprint('accommodation_bp', __name__)
api = Api(accommodation_bp)

""" ACCOMMODATIONS """
class Accommodations_Controller(Resource):
    def get(self):
        accommodations = [accommodation.to_dict() for accommodation in Accommodation.query.all()]
        
        response = make_response(jsonify(accommodations), 200)
        
        return response
    
# ~ Accommodation by ID #
class Accommodation_by_id(Resource):
    def get(self, id):
        accommodation = Accommodation.query.filter_by(accommodation_id = id).first()
        response = make_response(jsonify(accommodation.to_dict()), 200)
        return response
    
    def patch(self, id):
        accommodation = Accommodation.query.filter_by(accommodation_id = id).first()
        
        data = request.get_json()        
        for attr in data:
            setattr(accommodation, attr, data[attr])
            
        db.session.commit()
        
        response = make_response(jsonify(accommodation.to_dict()))
        return response
    
    def delete(self, id):
        accommodation = Accommodation.query.filter_by(accommodation_id = id).first()
        
        db.session.delete(accommodation)
        db.session.commit()
    
api.add_resource(Accommodations_Controller, '/accommodations')
api.add_resource(Accommodation_by_id, '/accommodations/<int:id>')