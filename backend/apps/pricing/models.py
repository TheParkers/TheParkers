from django.db import models

class Pricing(models.Model):
    area_code = models.CharField(max_length=20, unique=True)
    parking_rate_per_sq_m = models.FloatField()
    electric_charging_rate  = models.FloatField()
    car_wash_rate = models.FloatField()
    indoor_parking_rate = models.FloatField()
