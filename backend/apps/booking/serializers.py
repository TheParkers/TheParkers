'''
    Serializer: booking app
'''
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from apps.users.models import User
from apps.users.serializers import UserSerializer
from apps.parkingspace.models import ParkingSpace
from .models import BookingItems

class BookingSerializer(serializers.ModelSerializer):
    tpk_booking_user = UserSerializer(required=False)
    tpk_parkingspace = serializers.PrimaryKeyRelatedField(many=False, read_only=False, 
                                                        queryset=ParkingSpace.objects.all())
    class Meta:
        model = BookingItems
        fields = '__all__'
        read_only_fields = ('tpk_booking_user', 'tpk_parkingspace')

    def create(self, validated_data):
        book_user_data = validated_data.pop('tpk_booking_user')

        if book_user_data:
            tpk_booking_user = get_object_or_404(User, **book_user_data)
            validated_data['tpk_booking_user'] = tpk_booking_user

        new_booking = BookingItems.objects.create(**validated_data)
        return new_booking

    def update(self, instance, validated_data):
        instance.tpk_book_start_datetime = validated_data.get('tpk_book_start_datetime',
                                                            instance.tpk_book_start_datetime)
        instance.tpk_book_end_datetime = validated_data.get('tpk_book_end_datetime',
                                                            instance.tpk_book_end_datetime)
        #instance.tpk_hourly_rate = validated_data.get('tpk_hourly_rate', instance.tpk_hourly_rate)
        instance.tpk_book_cancelled = validated_data.get('tpk_book_cancelled',
                                                            instance.tpk_book_cancelled)
        return instance
