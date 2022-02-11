from django.db import models

class GCoordList(models.Model):
    Lat_db = models.CharField(max_length=100)
    Long_db = models.CharField(max_length=100)