from rest_framework import serializers
from .models import User, Permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userName', 'userType']
        app_label = 'User'

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['permissionName', 'permissionDesc']
        app_label = 'Permission'
