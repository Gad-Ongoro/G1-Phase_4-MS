from flask import Flask, render_template, request, make_response, jsonify, session, abort
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Vacation, Accommodation, Customer, Customer_Profile, Paymentdetail

app = Flask(__name__)
app.secret_key = b'\xb2_8\xcc\xfc\xec3n\xc5\x7f\x01-\xdal[\xc7'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///safaris.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


CORS(app)
bcrypt = Bcrypt(app)
api = Api(app)

migrate = Migrate(app, db)
db.init_app(app)


@app.route('/', methods=['get'])
def home():
    return render_template('flask_index.html')

""" CUSTOMERS SIGNUP """
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
                                # password = hashed_password
                                password = password
                                )
        db.session.add(new_customer)
        db.session.commit()
        n_customer = new_customer.to_dict()
        
        matched_customer = Customer.query.filter_by(email = customer_email).first()
        
        session['customer_id'] = matched_customer.customer_id
        
        response = make_response(jsonify(n_customer), 201)
        return response
    
api.add_resource(All_Customers, '/customers')


""" LOGIN """
class LogUserIn(Resource):
    def post(self):
        data = request.get_json()
        customer_email = data.get('email')
        password = data.get("password")
        
        customer = Customer.query.filter_by(email = customer_email).first().to_dict()
        
        if customer is None:
            return(jsonify({'error': "Unauthorized"}), 401)
        
        if not bcrypt.check_password_hash(customer.password, password):
            return(jsonify({'error': "Unauthorized"}), 401)
        
        # if customer.password != password:
        #     return(jsonify({'error': "Unauthorized"}), 401)
        
        # session['customer_id'] = customer.customer_id
        
        # return(jsonify({"Message" : f'Welcome {customer.user_name}'}))
        
        # customer_dict = customer.to_dict()
        
        # response = make_response(jsonify(customer_dict))
        response = make_response(jsonify(customer))
        return response
        
api.add_resource(LogUserIn, '/login')


""" CUSTOMER PROFILE """
class customer_profile(Resource):
    def get(self):
        profiles = [profile.to_dict() for profile in Customer_Profile.query.all()]
        
        response = make_response(jsonify(profiles), 200)        
        return response
    
api.add_resource(customer_profile, '/customer_profiles')


""" PAYMENT DETAILS """
class payment_details(Resource):
    def get(self):
        card_details = [card.to_dict() for card in Paymentdetail.query.all()]
        
        response = make_response(jsonify(card_details), 200)        
        return response
    
api.add_resource(payment_details, '/payment_details')


""" VACATIONS """
class All_Vacations(Resource):
    def get(self):
        vacations = [vacay.to_dict() for vacay in Vacation.query.all()]
            
        response = make_response(jsonify(vacations), 200)
        return response
    
api.add_resource(All_Vacations, '/vacations')


""" ACCOMMODATIONS """
class All_Accommodations(Resource):
    def get(self):
        accommodations = [accommodation.to_dict() for accommodation in Accommodation.query.all()]
        
        response = make_response(jsonify(accommodations), 200)
        
        return response
    
api.add_resource(All_Accommodations, '/accommodations')

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
    
api.add_resource(Accommodation_by_id, '/accommodations/<int:id>')


if __name__ == '__main__':
    app.run(debug=True)