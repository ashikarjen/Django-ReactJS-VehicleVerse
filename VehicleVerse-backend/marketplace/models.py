from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

class Vehicle(models.Model):
    VEHICLE_CHOICES = [
        ('Car', 'Car'),
        ('Bike', 'Bike'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    vehicle_type = models.CharField(max_length=4, choices=VEHICLE_CHOICES)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=15)
    whatsapp = models.CharField(max_length=15)
    price = models.PositiveIntegerField(default=0)
    address = models.TextField(default='No address provided')
    description = models.TextField(default='No description available')
    image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    extra_data = models.JSONField(default=dict, null=True, blank=True)

class Rental(models.Model):
    VEHICLE_CHOICES = [
        ('Car', 'Car'),
        ('Bike', 'Bike'),
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    vehicle_type = models.CharField(max_length=4, choices=VEHICLE_CHOICES)
    phone_number = models.CharField(max_length=15)
    whatsapp = models.CharField(max_length=15)
    model = models.CharField(max_length=100)
    price = models.PositiveIntegerField(default=0)
    address = models.TextField(default='No address provided')
    description = models.TextField(default='No description available')
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='rentals/', null=True, blank=True)
    extra_data = models.JSONField(default=dict, null=True, blank=True)
