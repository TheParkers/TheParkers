from django.db import models
from apps.users.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from apps.maps.models import ParkerMap

class ParkingSpaceFeatures(models.Model):
    tpk_has_car_charging = models.BooleanField(default=False)
    tpk_has_car_wash = models.BooleanField(default=False)
    tpk_has_indoor_parking = models.BooleanField(default=False)

class ParkingSpace(models.Model):
    tpk_user =  models.ForeignKey(User,
                on_delete=models.CASCADE,
                related_name='user',
                null=True, blank=True)
    tpk_ps_location = models.OneToOneField(ParkerMap,
                on_delete=models.CASCADE,
                related_name='tpk_ps_location')
    tpk_rating = models.PositiveSmallIntegerField(default=1,
                validators=[MinValueValidator(1), MaxValueValidator(5)])
    tpk_description = models.TextField(max_length=500)
    tpk_access_information = models.TextField(max_length=500, default="NA")
    tpk_price_per_hour = models.FloatField(default=2.0)
    tpk_parking_area = models.FloatField()
    tpk_has_features = models.BooleanField(default=False)
    tpk_vehicle_capacity = models.IntegerField()
    tpk_parking_features = models.OneToOneField(ParkingSpaceFeatures,
                        blank=True, null=True, on_delete=models.CASCADE,
                        related_name="tpk_parking_features")
    tpk_created_on = models.DateTimeField(auto_now_add=True)
    tpk_last_booked = models.DateTimeField()
    tpk_is_booked = models.BooleanField(default=False)

class ParkingSpaceImages(models.Model):
    tpk_base64_image = models.TextField(null=True, blank=True)
    tpk_parkingspace = models.ForeignKey(ParkingSpace,
                    related_name='tpk_parkingspace_images',
                    on_delete=models.CASCADE, null=True, blank=True)
