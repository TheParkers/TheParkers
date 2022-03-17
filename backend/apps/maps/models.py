
'''
    Model: Maps app
'''
from django.db import models
from django.contrib.gis.db import models

class ParkerMap(models.Model):
    #srid 4326 corresponds to lat/long representation
    #on map.
    '''
    model: for storing user location
    '''
    address = models.CharField(max_length=1000, default="address")
    city = models.CharField(max_length=100, default="Waterloo")
    country = models.CharField(max_length=100, default="Canada")
    area_code = models.CharField(max_length=20, default="N2L3G1")
    location = models.PointField(geography=True, srid=4326, unique=True)