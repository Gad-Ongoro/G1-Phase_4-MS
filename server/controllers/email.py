from flask import make_response, jsonify, Blueprint
from flask_mail import Message
from config import mail
from flask_mailman import EmailMessage
from flask_restful import Api, Resource

mail_bp = Blueprint("mail_bp", __name__) 
api = Api(mail_bp)

class Mailer(Resource):
    def get(self):
        msg = EmailMessage(
                "Title/Subject",
                "Hello",
                "gadongoro1@fastmail.com",
                ["gadongoro1@gmail.com"]
            )
        msg.send()

        response = make_response(jsonify({"msg": "Mail Sent!"}))
        return response

api.add_resource(Mailer, '/mail')