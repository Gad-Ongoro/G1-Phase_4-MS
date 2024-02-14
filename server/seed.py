from app import app
from faker import Faker
from models import db, Customer, Customer_Profile, Paymentdetail, Owner
from models import Booking, Review
from models import Vacation, Accommodation
from models import Newsletter_Mail
from random import choice as rc, randint as ri
import datetime

dt = datetime.datetime(2030, 1, 1)

fake = Faker()

# 1 Owner
with app.app_context():
    Owner.query.delete()
    for i in range(0, 10):        
        new_owner = Owner(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            email = fake.email(),
            user_name = fake.user_name(),
            password = fake.password()
        )    
        db.session.add(new_owner)
        db.session.commit()

# 2 Customer
with app.app_context():
    Customer.query.delete()
    for i in range(0, 10):
        new_customer = Customer(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            email = fake.email(),
            user_name = fake.user_name(),
            password = fake.password()
        )
        db.session.add(new_customer)
        db.session.commit()


# 3 Customer_Profile
with app.app_context():
    customers = Customer.query.all()
    Customer_Profile.query.delete()
    for safari_customer in customers:
        new_customer_profile = Customer_Profile(
            dp_url = fake.image_url(),
            phone_number = fake.phone_number(),
            backup_mail = fake.email(),
            account_type = "User",
            nationality = fake.country(),
            customer = safari_customer
        )
        db.session.add(new_customer_profile)
        db.session.commit()

# 4 Paymentdetail
with app.app_context():
    customers = Customer.query.all()
    Paymentdetail.query.delete()
    for safari_customer in customers:
        new_payment_detail = Paymentdetail(
            card_name = fake.name(),
            card_number = fake.credit_card_number(),
            CVV = fake.credit_card_security_code(),
            expiry = dt,
            customer = safari_customer
        )
        db.session.add(new_payment_detail)
        db.session.commit()
    
# 5 Bookings
with app.app_context():
    Booking.query.delete()
    for i in range(0, 10):
        new_booking = Booking(
            booked_at = dt,
            check_in = dt,
            check_out = dt,
            customer_id = ri(1, 10),
            vacation_id = ri(1, 12),
            accommodation_id = ri(1, 13)
        )
        db.session.add(new_booking)
        db.session.commit()
    
# 6 Reviews
with app.app_context():
    Review.query.delete()
    for i in range(0, 15):
        new_review = Review(
            rating = ri(4, 10),
            description = fake.sentence(),
            created_at = dt,
            updated_at = dt,
            customer_id = ri(1, 10),
            vacation_id = ri(1, 10),
            accommodation_id = ri(1, 10)
        )
        db.session.add(new_review)
        db.session.commit()
    
# 7 Vacations
with app.app_context():
    Vacation.query.delete()
    locations = ['Diani Beach', 'Cape Town', 'Mombasa', 'Nairobi', 'Egypt', 'Nyali', 'Naivasha', 'Zanzibar', 'Kisumu', 'Maldives', 'Dubai']

    vacay_image = [
        'https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/4025/conversions/Maasai-Mara-Thumbnail-2-thumbnail.webp',
        'https://r-xx.bstatic.com/xdata/images/xphoto/300x320/304715650.jpg?k=d8ead3fd401ff9b065e167a9d48e8d62fc950b00343e8307ef77d9a77aec0bc0&o=',
        'https://q-xx.bstatic.com/xdata/images/xphoto/300x320/136117132.jpg?k=6ed4213d8ed7b860bf9fbfbd91121e0dbbb6e1180ce0c3b45199ec072adfeb09&o=',
        'https://q-xx.bstatic.com/xdata/images/xphoto/300x320/182913308.jpg?k=e642d0a55d167e475c8e92d639c2767cbe09ec3aa074db13114547c4163c74cb&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/51877516.webp?k=d03114530510097094f4c8e93ecb4a6342e3dfd50eb95ba58b3f93bd873df394&o=',
        'https://q-xx.bstatic.com/xdata/images/xphoto/300x320/162418261.jpg?k=f5283bba552561a9ed40b033bfa1a0f1d505f32789322bb54dbda8750aae1f67&o=',
        'https://r-xx.bstatic.com/xdata/images/xphoto/300x320/183139628.jpg?k=13e62dcfc3616b48989ca853b0fc4398ffe2b95c4a5ce55bd73403aa3d82eed1&o=',
        'https://r-xx.bstatic.com/xdata/images/xphoto/300x320/163404134.jpg?k=8172b231e7acc27e2adf5210fde6ea54549441d2fda03c749c85b5bc6a4dd053&o=',
        'https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/3063/conversions/Turkiye-Thumbnail-thumbnail.webp',
        'https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/11582/conversions/WhatsApp-Image-2023-06-06-at-10.47.22-AM-thumbnail.webp',
        'https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/102/conversions/rsz-Ecotourism-Thumb-thumbnail.webp',
        'https://viutravel-cms-bucket.s3.eu-west-1.amazonaws.com/122/conversions/rsz-Romantic-Thumb-%282%29-thumbnail.webp'
        
    ]
    
    ratings = ['★★★★★', '★★★★', '★★★', '★★']
    
    for image in vacay_image:
        new_vacay = Vacation(
            thumbnail = image,
            name = fake.company(),
            location = rc(locations),
            price = ri(3000, 10000),
            rating = rc(ratings),
            preview = fake.sentence(),
            owner_id = ri(1, 20)
        )
        db.session.add(new_vacay)
        db.session.commit()
        
# 8 Accommodations 
with app.app_context():
    Accommodation.query.delete()
    hotel_image = [
        'https://cf.bstatic.com/xdata/images/hotel/square600/188488768.webp?k=8973d4fa31b16184854c9c6bf28b5c06fbf48dc72d9f22bef79a8189d9765144&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/178742097.webp?k=2a564fd74a33ff6f673e80ade892440675c62255b3c7044bc392ca869948bd94&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/497096683.webp?k=6a8006636214019c6800dd8519b6d2564cf43c84ff2388644de72bffa41ac80b&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/424875101.webp?k=189da70c4d2914e51f67780354a5e2dba6cb2440ba9f38b85705c2418f43ddd0&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/462375389.webp?k=d59c048f127978bd2be926bfdfc0ee73afb48b9ddbcdc6e96cb8a25c2dc96a86&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/223982344.webp?k=cae081dd9b90ff87cf71f04f468cfbf93e8cb0f3ef0ce2c9e6e839ed22d05878&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/110853464.webp?k=0acf9ef0e2fa0407802c6fa8617a23556b62ed02dbba127c2d3dd6b344407fd1&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/77904671.webp?k=61378d2ce2c4cdcb32929f8ab6b13463d1dffa03ead1e44d67c003002736bde1&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/495737164.webp?k=103c2b2537f53a332d4de75dd08e36a04a2053b1fc4b6b652da98681e73f5977&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/265347567.webp?k=966f5d9a0771713c1484c52909aa62fe8fbfdab005a3c682bf23e5ef4afb26ea&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/443263557.webp?k=5a0decae1c258459e3802f7d03145f11c8cb9b109fa9e0dc668151ee34fcde83&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/278600871.webp?k=01b375b5e89aa6f79b41b229e02231bf8b85ffe81098025f56f0de6d37429c66&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/55242416.webp?k=b9bd7472a37e2d1238087e29bfe2d6858ec93a7f82319e2f3851b87ce44551b6&o=',
        'https://cf.bstatic.com/xdata/images/hotel/square600/525814234.webp?k=db01614efb4554691fdf641f0ac47d71b7ffdf9dbbca165cc5bd67678d8b2b78&o='
        
    ]
    locations = ['Diani Beach', 'Cape Town', 'Mombasa', 'Nairobi', 'Egypt', 'Nyali', 'Naivasha', 'Zanzibar', 'Kisumu', 'Maldives', 'Dubai']
    
    ratings = ['★★★★★', '★★★★', '★★★', '★★']
    
    for image in hotel_image:
        new_accommodation = Accommodation(
            thumbnail = image,
            name = fake.company(),
            location = rc(locations),
            price = ri(3000, 10000),
            rating = ri(5, 10),
            preview = fake.sentence(),
            owner_id = ri(1, 20)
        )
        db.session.add(new_accommodation)
        db.session.commit()
        
# 9 Newsletter Mails 
with app.app_context():
    Newsletter_Mail.query.delete()
    
    for i in range(0, 20):
        new_newsletter_mail = Newsletter_Mail(email = fake.email())        
        db.session.add(new_newsletter_mail)
        db.session.commit()