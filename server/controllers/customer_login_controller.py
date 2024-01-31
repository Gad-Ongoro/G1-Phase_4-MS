from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer
from config import db, bcrypt, create_access_token

log_in_bp = Blueprint('log_in_bp', __name__)
api = Api(log_in_bp)

class Customer_Login(Resource):
    def post(self):
        data = request.get_json()
        customer_email = data["email"]
        password = data['password']
        
        try:
            if data is None:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Bad request"
                }, 400
                
            # validate input
            customer = Customer.query.filter_by(email = customer_email).first()
            if not customer:
                return {
                    "message": "Please provide correct user details",
                    "data": None,
                    "error": "Username not found"
                }, 401
            
            if not bcrypt.check_password_hash(customer.password, password):
                abort(401, details = 'Incorrect Password!')
            
            
            # else, create access token and jwt metadata            
            jwt_metadata = {"user_name" : customer.user_name}
            token = create_access_token(identity=customer.customer_id, additional_claims=jwt_metadata)
            
            return({'JWT_token' : token})
                
        except Exception as e:
            return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
            }, 500
        
api.add_resource(Customer_Login, '/login')