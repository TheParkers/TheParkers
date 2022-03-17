'''
    Serializer: parkingspace app
'''
from rest_framework import serializers

from apps.maps.models import ParkerMap
from apps.users.models import User
from .models import ParkingSpace, ParkingSpaceFeatures, ParkingSpaceImages

from apps.maps.serializers import MapSerializer
from apps.users.serializers import UserSerializer
from django.shortcuts import get_object_or_404

class ParkingSpaceFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpaceFeatures
        fields = '__all__'

class ParkingSpaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpaceImages
        fields = "__all__"

class ParkingSpaceSerializer(serializers.ModelSerializer):
    tpk_parking_features = ParkingSpaceFeaturesSerializer()
    tpk_ps_location = MapSerializer()
    tpk_user = UserSerializer(required=False)
    tpk_parkingspace_images = ParkingSpaceImageSerializer(required=False, 
                                                          many=True, read_only=False)

    class Meta:
        model = ParkingSpace
        fields = '__all__'
        read_only_fields = ('tpk_user',)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['tpk_parking_features'] = ParkingSpaceFeaturesSerializer(
                                           instance.tpk_parking_features).data
        response['tpk_ps_location'] = MapSerializer(
                                      instance.tpk_ps_location).data
        response['tpk_user'] = UserSerializer(
                               instance.tpk_user).data['tpk_firebaseid']
        response['tpk_parkingspace_images'] = ParkingSpaceImageSerializer(
                                              instance.tpk_parkingspace_images, 
                                              many=True).data
        return response

    def create(self, validated_data):
        parkingspace_user_data = validated_data.pop('tpk_user')
        if parkingspace_user_data:
            tpk_user = get_object_or_404(User, **parkingspace_user_data)
            validated_data['tpk_user'] = tpk_user
        parkingspace_location_data = validated_data.pop('tpk_ps_location')
        parkingspace_features_data = validated_data.pop('tpk_parking_features')
        parkingspace_image_data = validated_data.pop('tpk_parkingspace_images')
        validated_data['tpk_ps_location'] = ParkerMap.objects.create(**parkingspace_location_data)
        validated_data['tpk_parking_features'] = ParkingSpaceFeatures.objects.create(**parkingspace_features_data)

        parkingspace = ParkingSpace.objects.create(**validated_data)
        parkingspace_images_list = []
        for image in parkingspace_image_data:
            parkingspace_images_list.append(ParkingSpaceImages.objects.create(tpk_parkingspace=parkingspace,
                                             **image))
        parkingspace.tpk_parkingspace_images.set(parkingspace_images_list)
        return parkingspace
