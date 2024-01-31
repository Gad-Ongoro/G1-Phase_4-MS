from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"
    
    serialize_rules = ('-bookings.customer', '-reviews.customer', '-payment_detail.customer', '-customer_profile.customer',)
    
    customer_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    user_name = db.Column(db.String(50))
    password = db.Column(db.String(50))
    
    bookings = db.relationship("Booking", backref = 'customer')
    reviews = db.relationship('Review', backref = 'customer')
    customer_profile = db.relationship('Customer_Profile', backref = 'customer', uselist = False)
    payment_detail = db.relationship('Paymentdetail', backref = 'customer', uselist = False)
    
    @validates('email')
    def email_validation(self, key, value):
        if '@' not in value:
            raise ValueError("Please provide a valid email")
        return value
    
class Customer_Profile(db.Model, SerializerMixin):
    __tablename__ = "customer_profile"
    
    # serialize_rules = ('-customer.customer_profile')
    serialize_rules = ('-customer.bookings', '-customer.reviews',)
    
    profile_id = db.Column(db.Integer, primary_key = True)
    dp_url = db.Column(db.String)
    backup_mail = db.Column(db.String)
    account_type = db.Column(db.String)
    nationality = db.Column(db.String)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'))
    
class Paymentdetail(db.Model, SerializerMixin):
    __tablename__ = 'payment_detail'
    
    # serialize_rules = ('-customer.payment_detail')
    serialize_rules = ('-customer.bookings', '-customer.reviews',)
    
    payment_detail_id = db.Column(db.Integer, primary_key = True)
    card_name = db.Column(db.String)
    card_number = db.Column(db.Integer)
    CVV = db.Column(db.Integer)
    expiry = db.Column(db.DateTime)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'))
    
class Owner(db.Model, SerializerMixin):
    __tablename__ = "owners"
    
    serialize_rules = ('-vacations.owner', '-accommodations.owner', '-vacations.customer', '-accommodations.customer',)
    
    owner_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    user_name = db.Column(db.String(50))
    password = db.Column(db.String(50))
    
    vacations = db.relationship('Vacation', backref = 'owner')
    accommodations = db.relationship('Accommodation', backref = 'owner')
    
    @validates('email')
    def email_validation(self, key, value):
        if '@' not in value:
            raise ValueError("Please provide a valid email")
        return value
    
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    
    serialize_rules = ('-customer.reviews', '-vacation.reviews', '-accommodation.reviews', '-customer.bookings', '-customer.customer_profile', '-customer.payment_detail',)
    
    review_id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.Integer)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'))
    vacation_id = db.Column(db.Integer, db.ForeignKey('vacations.vacation_id'))
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodations.accommodation_id'))
    
class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"
    
    serialize_rules = ('-customer.bookings', '-vacation.bookings', '-accommodation.bookings', '-customer.reviews', '-customer.customer_profile', '-customer.payment_detail')
    
    booking_id = db.Column(db.Integer, primary_key = True)
    booked_at = db.Column(db.DateTime, server_default=db.func.now())
    check_in = db.Column(db.DateTime)
    check_out = db.Column(db.DateTime)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'))
    vacation_id = db.Column(db.Integer, db.ForeignKey('vacations.vacation_id'))
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodations.accommodation_id'))
    
class Vacation(db.Model, SerializerMixin):
    __tablename__ = 'vacations'
    
    serialize_rules = ('-owner.vacations', '-bookings.vacation', '-reviews.vacation', '-owner.accommodations')
    
    vacation_id = db.Column(db.Integer, primary_key = True)
    thumbnail = db.Column(db.String)
    name = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    preview = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.owner_id'))
    
    bookings = db.relationship('Booking', backref = 'vacation')
    reviews = db.relationship('Review', backref = 'vacation')
    
class Accommodation(db.Model, SerializerMixin):
    __tablename__ = 'accommodations'
    
    serialize_rules = ('-owner.accommodations', '-bookings.accommodation', '-reviews.accommodation', '-owner.vacations',)
    
    accommodation_id = db.Column(db.Integer, primary_key = True)
    thumbnail = db.Column(db.String)
    name = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    preview = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.owner_id'))
    
    bookings = db.relationship('Booking', backref = 'accommodation')
    reviews = db.relationship('Review', backref = 'accommodation')
    
class Newsletter_Mail(db.Model, SerializerMixin):
    __tablename__ = 'newsletter_mails'
    
    newsletter_mails_id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String)