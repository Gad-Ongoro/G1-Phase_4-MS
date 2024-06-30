from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

# Create your models here.
class CustomUser(AbstractUser):
    user_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    role = models.IntegerField(default=100)
    
    # Related_name to avoid clashes with built-in User model
    groups = models.ManyToManyField('auth.Group', related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='customuser_set', blank=True)
    
class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    backup_mail = models.EmailField()
    nationality = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.user.username

class Service(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    service_type = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    location = models.CharField(max_length=100)
    rating = models.IntegerField()
    image = models.ImageField(upload_to='service_pics/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return self.name
    
class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.service.name

class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment
    
class Newsletter_Mail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField()

    def __str__(self):
        return self.email
