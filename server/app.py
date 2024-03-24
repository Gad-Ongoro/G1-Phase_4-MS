from config import db, app, bcrypt, render_template, jwt_required
from config import api, Resource, request, make_response, jsonify, session, abort
from models import Vacation, Accommodation, Customer_Profile, Paymentdetail, Booking, Review
from controllers.newsletter_mails_controller import newsletter_mail_bp
from controllers.customers_controller import customers_bp
from controllers.customer_login_controller import log_in_bp
from controllers.accommodations_controller import accommodation_bp
from controllers.customer_profile_controller import cust_profile_bp
from controllers.reviews_controller import reviews_bp
from controllers.mpesa_exp import mpesa_exp_bp

app.register_blueprint(newsletter_mail_bp)
app.register_blueprint(customers_bp)
app.register_blueprint(log_in_bp)
app.register_blueprint(accommodation_bp)
app.register_blueprint(cust_profile_bp)
app.register_blueprint(reviews_bp)
app.register_blueprint(mpesa_exp_bp)

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

""" Bookings """



if __name__ == '__main__':
    app.run(debug=True)