from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer, Customer_Profile
from config import db, bcrypt, create_access_token, session

cust_profile_bp = Blueprint('cust_profile_bp', __name__)
api = Api(cust_profile_bp)

""" CUSTOMER PROFILE """
class Customer_Profiles_Resource(Resource):
    def get(self):
        customer_profiles = [profile.to_dict() for profile in Customer_Profile.query.all()]

        response = make_response(jsonify(customer_profiles), 200)
        return response
    
    def post(self):
        data = request.get_json()

        new_customer_profile = Customer_Profile(
            dp_url = data["dp_url"],
            backup_mail = data["backup_mail"],
            account_type = data["account_type"],
            nationality = data["nationality"],
            customer_id = data["customer_id"]
        )
        
        db.session.add(new_customer_profile)
        db.session.commit()
        
        response = make_response(jsonify(new_customer_profile.to_dict()), 201)
        return response

class Customer_Profile_Resource(Resource):
    def get(self, id):
        customer_profile = Customer_Profile.query.filter_by(profile_id = id).first()
        
        response = make_response(jsonify(customer_profile.to_dict()), 200)
        return response
    
    def patch(self, id):
        data = request.get_json()
        customer_profile = Customer_Profile.query.filter_by(profile_id = id).first()

        for attr in data:
            setattr(customer_profile, attr, data[attr])
            
        db.session.commit()
        
        response = make_response(jsonify(customer_profile.to_dict()))
        return response
    
    def delete(self, id):
        customer_profile = Customer_Profile.query.filter_by(profile_id = id).first()
        
        db.session.delete(customer_profile)
        db.session.commit()

api.add_resource(Customer_Profiles_Resource, '/customer_profiles')
api.add_resource(Customer_Profile_Resource, '/customer_profiles/<int:id>')