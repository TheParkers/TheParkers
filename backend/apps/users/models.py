from django.db import models

class User(models.Model):
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

    is_anonymous = False
    is_authenticated = False
