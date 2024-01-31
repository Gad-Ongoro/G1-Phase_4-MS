from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer
from config import db, bcrypt

customers_bp = Blueprint('customers_bp', __name__)
api = Api(customers_bp)

""" CUSTOMERS """
# """ SIGNUP """
class All_Customers(Resource):
    def get(self):
        customers = [customer.to_dict() for customer in Customer.query.all()]
        response = make_response(jsonify(customers), 200)
        
        return response
        
    def post(self):
        data = request.get_json()
        
        customer_email = data['email']
        password = data["password"]
        customer_exists = Customer.query.filter_by(email = customer_email).first() is not None
        
        if customer_exists:
            abort(409)
            
        hashed_password = bcrypt.generate_password_hash(password)
        
        new_customer = Customer(first_name = data['first_name'],
                                last_name = data['last_name'],
                                email = customer_email,
                                user_name = data['user_name'],
                                password = hashed_password
                                # password = password
                                )
        db.session.add(new_customer)
        db.session.commit()
        n_customer = new_customer.to_dict()
        
        matched_customer = Customer.query.filter_by(email = customer_email).first()
        
        # session['customer_id'] = matched_customer.customer_id
        
        response = make_response(jsonify(n_customer), 201)
        return response
    
api.add_resource(All_Customers, '/customers')
