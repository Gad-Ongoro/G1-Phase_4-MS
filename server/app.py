from config import db, app, bcrypt, render_template
from config import api, Resource, request, make_response, jsonify, session, abort, jwt
from models import Vacation, Accommodation, Customer, Customer_Profile, Paymentdetail, Booking

""" HOME """
@app.route('/', methods=['get'])
def home():
    return render_template('flask_index.html')

""" CHECK SESSION """
class CheckSession(Resource):
    def get(self):
        try:
            if not session['token']:
                return {'token': None}, 404

            return {'token': session['token']}, 200
        except Exception as e:
            return {'token': None}, 404
api.add_resource(CheckSession, '/check_session')

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


""" LOGIN """
class LogUserIn(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Bad request"
                }, 400

            # validate input
            email = data["email"]
            user = Customer.query.filter_by(email == email).first()
            if not user:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Username not found"
                }, 404

            password = data['password']
            if bcrypt.check_password_hash(user.password, password):
                try:
                    # token should expire after 24 hrs
                    user.token = jwt.encode(
                        {"user_id": str(user.customer_id)},
                        app.config["SECRET_KEY"],
                        algorithm="HS256"
                    )
                    # set token to session
                    session['token'] = user.token

                    return make_response(jsonify({
                        "message": "Successfully fetched auth token",
                        "data": user.to_dict(),
                        "token": str(user.token)
                    }), 200)
                except Exception as e:
                    return {
                        "error": "Something went wrong",
                        "message": str(e)
                    }, 500
            return {
                "message": "Error fetching auth token!.",
                "data": None,
                "error": "Invalid username or password. Try again.."
            }, 404
        except Exception as e:
            return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
            }, 500
        
        # data = request.get_json()
        # customer_email = data.get('email')
        # password = data.get("password")
        
        # customer = Customer.query.filter_by(email = customer_email).first().to_dict()
        # response = make_response(jsonify(customer))
        
        # try:
        #     if not data:
        #         return({'message': 'Please provide the required inputs'}, 400)
        #     customer = Customer.query.filter_by(email = customer_email).first()
        #     response = make_response(jsonify(customer))
            
        #     if customer is None:
        #         abort(404, detail=f'No Users with {customer_email} Found!')
                
        #     if not bcrypt.check_password_hash(customer.password, password):
        #         abort(403, detail='Incorrect Password!')
        #     else:
        #         try:
        #             # token should expire after 24 hrs
        #             customer.token = jwt.encode(
        #                 {'customer_id': str(customer.customer_id)},
        #                 app.config["SECRET_KEY"],
        #                 algorithm="HS256"
        #             )
                    
        #             session['token'] = customer.token
                    
        #             return make_response(jsonify({
        #                 "message": "Successfully fetched auth token",
        #                 "data": customer.to_dict(),
        #                 "token": str(customer.token)
        #             }), 200)
                    
        #         except Exception as e:
        #             return (
        #                 {
        #                 "error": "Something went wrong",
        #                 "message": str(e)
        #             }, 500
        #             )
            
        # except Exception as e:
        #     return(
        #         {"message": "Something went wrong!", 
        #             "error": str(e),
        #             "data": None
        #         }, 500)

        
        
        

        # token = create_access_token(identity=customer.customer_id)
        # return({'jwt': token})
        
        # session['customer_id'] = customer.customer_id
        
        # return(jsonify({"Message" : f'Welcome {customer.user_name}'}))
        
        # customer_dict = customer.to_dict()
        
        # response = make_response(jsonify(customer_dict))
        # response = make_response(jsonify(customer))
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

""" CUSTOMER BOOKINGS """
# get a single customer's bookings
class Customer_Bookings(Resource):
    def get(self, id):
        customer_bookings = [booking.to_dict() for booking in Booking.query.filter_by(customer_id = id).all()]
    
        response = make_response(jsonify(customer_bookings), 200)
        
        return response
    
api.add_resource(Customer_Bookings, '/customer_bookings/<int:id>')


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

""" Bookings """

if __name__ == '__main__':
    app.run(debug=True)