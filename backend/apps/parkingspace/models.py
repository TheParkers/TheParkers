from sys import maxsize
from django.db import models
from django.utils import timezone

class ParkingSpaceFeatures(models.Model):
    has_car_charging = models.BooleanField(default=False)
    has_car_wash = models.BooleanField(default=False)
    has_indoor_parking = models.BooleanField(default=False)

class ParkingSpace(models.Model):
    parking_area = models.FloatField()
    #TODO need to link userID who has valid permissions for registering their parking space.
    has_features = models.BooleanField(default=False)
    vehicle_capacity = models.IntegerField()
    address = models.CharField(max_length=1000)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    area_code = models.CharField(max_length=20)
    #create index to search based on area_code faster.
    # our pricing model will use this code to figure out the pricing to select.
    lat = models.FloatField()
    long = models.FloatField()
    parking_features = models.OneToOneField(ParkingSpaceFeatures,
                        blank=True, null=True, on_delete=models.CASCADE,
                        related_name="parking_features")
    created_on = models.DateTimeField(auto_now_add=True)
    last_booked = models.DateTimeField()
    is_booked = models.BooleanField(default=False)
