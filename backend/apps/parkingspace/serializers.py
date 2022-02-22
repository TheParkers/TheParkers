'''
    Serializer: parkingspace app
'''
from rest_framework import serializers
from .models import ParkingSpace, ParkingSpaceFeatures

class ParkingSpaceFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpaceFeatures
        fields = '__all__'

class ParkingSpaceSerializer(serializers.ModelSerializer):
    parking_features = ParkingSpaceFeaturesSerializer(read_only=True)
    class Meta:
        model = ParkingSpace
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['parking_features'] = ParkingSpaceFeaturesSerializer(instance.parking_features).data
        return response
