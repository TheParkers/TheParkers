'''
    Model: users app
'''
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class User(AbstractBaseUser,PermissionsMixin):
    '''
    Model: User
    tpk_firebaseid: maxlenth=100
    tpk_name: maxlenth=100
    tpk_email: max_length=100, unique=True
    tpk_updatedOn: auto_now=True
    tpk_userCreatedOn: auto_now_add=True
    tpk_photoUrl: max_length=500, default: NA
    tpk_isdeleted: default=False, True if user is deleted from parker database
    is_active: default=True, True if user is blocked from parker database
    '''
    REQUIRED_FIELDS = ['tpk_firebaseid', 'tpk_name']
    USERNAME_FIELD = 'tpk_email'
    tpk_firebaseid = models.CharField(max_length=100)
    tpk_name = models.CharField(max_length=100)
    tpk_email = models.CharField(max_length=100, unique=True)
    tpk_updatedOn = models.DateTimeField(auto_now=True)
    tpk_userCreatedOn = models.DateTimeField(auto_now_add=True)
    tpk_photoUrl = models.CharField(max_length=500, default="NA")
    tpk_isdeleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    #overwrite columns to meet guardian depends
    password = models.CharField(max_length=100, null=True, default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(blank=True, null=True)

    is_anonymous = False
    is_authenticated = False