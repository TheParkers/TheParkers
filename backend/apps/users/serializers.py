'''
    Serializer: user app
'''
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers

from apps.parkingspace.models import ParkingSpace
from .models import User

class UserSerializer(serializers.ModelSerializer):
    '''
    Serializer: Generic User
    '''
    class Meta:
        model = User
        fields = ['tpk_firebaseid']
        app_label = 'User'

    def create(self, validated_data):
        locations_data = validated_data.pop('ps_location')
        user = User.objects.create(**validated_data)
        for location in locations_data:
            ParkingSpace.objects.create(**location)
        validated_data['ps_location'] = locations_data
        return user

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