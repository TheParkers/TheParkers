from django.db import models

class User(models.Model):
    userName = models.CharField(max_length=100)
    userType = models.CharField(max_length=100)
    def __str__(self):
        return self.userName
        