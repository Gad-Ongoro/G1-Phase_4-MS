from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer
from config import db, bcrypt, create_access_token, session

customers_bp = Blueprint('customers_bp', __name__)
api = Api(customers_bp)

""" CUSTOMERS """
class All_Customers(Resource):
    def get(self):
        customers = [customer.to_dict() for customer in Customer.query.all()]
        response = make_response(jsonify(customers), 200)
        
        return response
    
    # """ SIGNUP """
    def post(self):
        data = request.get_json()
        
        customer_email = data['email']
        password = data["password"]
        customer_exists = Customer.query.filter_by(email = customer_email).first() is not None
        
        if customer_exists:
            abort(409, details='Conflict! Already Exists')
            
        hashed_password = bcrypt.generate_password_hash(password)
        
        new_customer = Customer(first_name = data['first_name'],
                                last_name = data['last_name'],
                                email = customer_email,
                                user_name = data['user_name'],
                                password = hashed_password
                                )
        db.session.add(new_customer)
        db.session.commit()
        customer_dict = new_customer.to_dict()
        
        jwt_metadata = {"user_name" : new_customer.user_name}
        token = create_access_token(identity=new_customer.customer_id, additional_claims=jwt_metadata)
        # session['customer_id'] = new_customer.customer_id
        return({'JWT_token' : token})
        
        
        response = make_response(jsonify(customer_dict), 201)
        return response

api.add_resource(All_Customers, '/customers')
