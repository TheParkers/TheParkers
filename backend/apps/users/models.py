from django.db import models
from django.contrib.auth.models import AbstractUser

class User(models.Model):
    tpk_firebaseid = models.CharField(max_length=100)
    tpk_photoUrl = models.CharField(max_length=500, default="NA")

    def __str__(self):
        return self.userName