'''
    Serializer: user app
'''
from rest_framework import serializers
from django.contrib.auth.models import Group, Permission
from .models import User#, Permission

class UserSerializer(serializers.ModelSerializer):
    '''
    Serializer: Generic User
    '''
    class Meta:
        model = User
        fields = ['tpk_firebaseid']
        app_label = 'User'

class UserResponseSerializer(serializers.ModelSerializer):
    '''
    Serializer: User for success response
    '''
    class Meta:
        model = User
        fields = ['tpk_name', 'tpk_email', 'tpk_photoUrl']
        app_label = 'User'

class PermissionSerializer(serializers.ModelSerializer):
    '''
    Serializer: Generic Permission
    '''
    class Meta:
        model = Permission
        fields = ['name', 'codename']
        app_label = 'Permission'

class RoleSerializer(serializers.ModelSerializer):
    '''
    Serializer: Generic Role
    '''
    class Meta:
        model = Group
        fields = ['id', 'name']
        app_label = 'Role'
