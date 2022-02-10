from django.db import models
from django.contrib.auth.models import AbstractUser

class User(models.Model):
    tpk_firebaseid = models.CharField(max_length=100)
    tpk_name = models.CharField(max_length=100)
    tpk_email = models.CharField(max_length=100, unique=True)
    tpk_updatedOn = models.DateTimeField(auto_now=True)
    tpk_userCreatedOn = models.DateTimeField(auto_now_add=True)
    tpk_photoUrl = models.CharField(max_length=500, default="NA")