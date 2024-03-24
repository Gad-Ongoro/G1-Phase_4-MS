from flask import Blueprint, make_response, jsonify, request, abort
from flask_restful import Api, Resource
from models import Customer
from config import db, bcrypt, create_access_token

import base64
import requests
from datetime import datetime
import pytz

mpesa_exp_bp = Blueprint('mpesa_exp_bp', __name__)
api = Api(mpesa_exp_bp)

class MpesaPaymentExp(Resource):
    pass

req_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

def authorization(url):
    key = 'JfdTRBnqc4OCiPOEkxY59uDt18KGHkilbBN3VUlTcuI7BZRx'
    secret = 'QWY1XIGAurRsRFaclhb1woJ4a2Y290t5DWGpOelA3hwJ3AH6idisuMgQZhADXsW0'

    plain_text = f'{key}:{secret}'
    bytes_obj = bytes(plain_text,'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4str = bs4.decode()

    headers = {'Authorization':'Basic '+ bs4str}

    res = requests.get(url, headers = headers)
    return res.json()['access_token']

authorization_token = authorization('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')

def generate_timestamp():
    kenyan_timezone = pytz.timezone('Africa/Nairobi')
    current_time = datetime.now(kenyan_timezone)
    time = current_time.strftime('%Y%m%d%H%M%S')
    return time
timestamp = generate_timestamp()

def create_password(shortcode, passkey, timestamp):
    plain_text = shortcode+passkey+timestamp
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4 = bs4.decode()
    return bs4
password = create_password('174379', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', timestamp)

def make_payment(number):
    payload = {    
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",    
        "Amount": "1",    
        "PartyA": number,    
        "PartyB": "174379",    
        "PhoneNumber": number,    
        "CallBackURL": "https://mydomain.com/pat",    
        "AccountReference":"Gad Ongoro",    
        "TransactionDesc":"Gad Ongoro"
    }

    headers = {'Authorization': 'Bearer ' + authorization_token}
    
    res = requests.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers = headers, json = payload)
    print(res.json())

make_payment('254798436255')

api.add_resource(MpesaPaymentExp, '/mpesa_payment')