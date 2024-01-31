from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource
from models import Newsletter_Mail
from config import db

newsletter_mail_bp = Blueprint("nm_bp", __name__)
api = Api(newsletter_mail_bp)

class Newsletter_Mails_Resource(Resource):
    def get(self):
        newsletter_mails = [nm.to_dict() for nm in Newsletter_Mail.query.all()]
        
        response = make_response(jsonify(newsletter_mails), 200)
        
        return response
    
    def post(self):
        data = request.get_json()
        
        new_newsletter_mail = Newsletter_Mail(email = data.get('email'))
        
        db.session.add(new_newsletter_mail)
        db.commit()
        
    
class Newsletter_Mail_Resource(Resource):
    def get(self, id):
        newsletter_mail = Newsletter_Mail.query.filter_by(newsletter_mails_id = id).first().to_dict()
        
        response = make_response(jsonify(newsletter_mail), 200)
        return response
    
    def patch(self, id):
        data = request.get_json()
        
        newsletter_mail = Newsletter_Mail.query.filter_by(newsletter_mails_id = id).first()
        
        for attr in data:
            setattr(newsletter_mail, attr, data[data])
            
        db.session.commit()
        
        response = make_response(jsonify(newsletter_mail.to_dict()), 200)
        
        return response
    
    def delete(self, id):
        newsletter_mail = Newsletter_Mail.query.filter_by(newsletter_mails_id = id).first()
        
        db.session.delete(newsletter_mail)
        db.session.commit()
        
api.add_resource(Newsletter_Mails_Resource, '/newsletter_mails')
api.add_resource(Newsletter_Mail_Resource, '/newsletter_mails/<int:id>')