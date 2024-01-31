from config import db, app, bcrypt, render_template, jwt_required
from config import api, Resource, request, make_response, jsonify, session, abort
from models import Vacation, Accommodation, Customer, Customer_Profile, Paymentdetail, Booking
from controllers.newsletter_mails_controller import newsletter_mail_bp
from controllers.customers_controller import customers_bp
from controllers.customer_login_controller import log_in_bp

app.register_blueprint(newsletter_mail_bp)
app.register_blueprint(customers_bp)
app.register_blueprint(log_in_bp)

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
    @jwt_required()
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