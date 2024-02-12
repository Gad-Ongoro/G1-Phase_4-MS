from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer
from config import db, bcrypt, create_access_token

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

        response = make_response(jsonify(customer_dict), 201)
        return response

class Customer_By_ID(Resource):
    def get(self, id):
        customer = Customer.query.filter_by(customer_id = id).first()
        customer_dict = customer.to_dict()

        response = make_response(jsonify(customer_dict), 200)
        return response

    def patch(self, id):
        data = request.get_json()
        customer = Customer.query.filter_by(customer_id = id).first()

        for attr in data:
            setattr(customer, attr, data[attr])

        db.session.commit()

        response = make_response(jsonify(customer.to_dict()))
        return response

    def delete(self, id):
        customer = Customer.query.filter_by(customer_id = id).first()

        db.session.delete(customer)
        db.session.commit()
        
        response = make_response(jsonify({'Message': "Successfully Deleted Account"}))
        return response

api.add_resource(All_Customers, '/customers')
api.add_resource(Customer_By_ID, '/customers/<int:id>')