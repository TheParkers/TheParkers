from django.db import models

class User(models.Model):
    userName = models.CharField(max_length=100)
    userType = models.CharField(max_length=100)
    def __str__(self):
        return self.userName

class Permission(models.Model):
    permissionName = models.CharField(max_length=100)
    permissionDesc = models.CharField(max_length=255)
    def __str__(self):
        return self.permissionName

class Role(models.Model):
    roleName = models.CharField(max_length=100)
    roleDesc = models.CharField(max_length=255)
    def __str__(self):
        return self.roleName

class UserRole(models.Model):
    roleName = models.CharField(max_length=100)
    userName = models.CharField(max_length=100)
    def __str__(self):
        return self.roleName

class RolePermission(models.Model):
    roleID = models.IntegerField()
    permissionID = models.IntegerField()
    permissionApplied = models.BinaryField()
    def __str__(self):
        return self.roleID
