
'''
    Model: Maps app
'''
from django.db import models

class ParkerMap(models.Model):
    '''
    Model: parker
    tpk_firebaseid: maxlenth=100
    tpk_name: maxlenth=100
    tpk_email: max_length=100, unique=True
    tpk_updatedOn: auto_now=True
    tpk_userCreatedOn: auto_now_add=True
    tpk_photoUrl: max_length=500, default: NA
    tpk_isdeleted: default=False, True if user is deleted from parker database
    is_active: default=True, True if user is blocked from parker database
    '''
    Lat_db = models.CharField(max_length=100)
    Long_db = models.CharField(max_length=100)
