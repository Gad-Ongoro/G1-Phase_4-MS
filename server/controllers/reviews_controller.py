from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Review
from config import db, bcrypt, create_access_token
from datetime import datetime

reviews_bp = Blueprint('reviews_bp', __name__)
api = Api(reviews_bp)

""" REVIEWS """
class All_Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        
        response = make_response(jsonify(reviews), 200)
        return response
    
    def post():
        data = request.get_json()

        new_review = Review(
            rating = data['rating'],
            description = data['description'],
            created_at = datetime.now(),
            updated_at = datetime.now(),
            customer_id = data['customer_id'],
            vacation_id = data['vacation_id'],
            accommodation_id = data['accommodation_id']
        )

        db.session.add(new_review)
        db.session.commit()

        response = make_response(jsonify(new_review.to_dict()))
        return response

class Review_By_ID(Resource):
    def get(self, id):
        review = Review.query.filter_by(review_id = id).first().to_dict()
        response = make_response(jsonify(review))
        return response
api.add_resource(All_Reviews, '/reviews')
api.add_resource(Review_By_ID, '/reviews/<int:id>')