from django.db import models

# Create your models here.
class GCoordList(models.Model):
    Lat_db = models.CharField(max_length=100)
    Long_db = models.CharField(max_length=100)