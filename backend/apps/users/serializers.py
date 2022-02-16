'''
    Serializer: user app
'''
from rest_framework import serializers
from .models import User

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
        