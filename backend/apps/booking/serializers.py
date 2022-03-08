'''
    Serializer: booking app
'''
from rest_framework import serializers

from apps.maps.models import ParkerMap
from apps.users.models import User
from .models import BookingItems
from apps.parkingspace.models import ParkingSpace

#from apps.parkingspace.serializers import ParkingSpaceSerializer
#from apps.users.serializers import UserSerializer
from django.shortcuts import get_object_or_404

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingItems
        fields = '__all__'
        read_only_fields = ('tpk_booking_user', 'tpk_parkingspace')

    def create(self, validated_data):
        book_user_data = validated_data.pop('tpk_booking_user')
        book_parkingspace_data = validated_data.pop('tpk_parkingspace')

        if book_user_data:
            tpk_booking_user = get_object_or_404(User, **book_user_data)
            validated_data['tpk_booking_user'] = tpk_booking_user

        if book_parkingspace_data:
            tpk_parkingspace = get_object_or_404(ParkingSpace, **book_parkingspace_data)
            validated_data['tpk_parkingspace'] = tpk_parkingspace

        new_booking = BookingItems.objects.create(**validated_data)
        return new_booking
