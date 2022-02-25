'''
    Serializer: user app
'''
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
