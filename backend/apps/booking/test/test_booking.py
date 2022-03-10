import json
from unittest.mock import patch
from django.http import JsonResponse
from django.contrib.gis.geos import Point
from django.contrib.auth.models import Group, Permission


from apps.parkingspace.models import ParkingSpace, ParkingSpaceFeatures
from apps.maps.models import ParkerMap
from apps.users.models import User
from apps.users.permissions import assign_permissions_to_roles
from apps.booking.models import BookingItems
from apps.booking.serializers import BookingSerializer
from apps.parkingspace.serializers import ParkingSpaceSerializer
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone

class TestBooking(APITestCase):
    @patch('apps.booking.models.BookingItems.objects.get')
    @patch('apps.parkingspace.models.ParkingSpace.objects.get')
    @patch('apps.users.models.User.objects.get')
    def setUp(self, mockUser, mockParkingSpace, mockBooking):
        #setup test user
        test_user = User.objects.create(tpk_firebaseid="testid",
                        tpk_name="test",
                        tpk_email="test_email@test.com")
        assign_permissions_to_roles()
        mockUser.return_value = test_user
        user_role = Group.objects.get(name='SUPERUSER')
        user_role.user_set.add(test_user)

        #setup test parking space
        map_location = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        parkingspacefeature_1 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = True,
                                tpk_has_car_wash = False, tpk_has_indoor_parking = False)
        testParkingSpace = ParkingSpace.objects.create(tpk_parking_area = 100,
                            tpk_has_features = True, tpk_vehicle_capacity = 1,
                            tpk_ps_location = map_location,
                            tpk_parking_features = parkingspacefeature_1,
                            tpk_created_on = timezone.now(),
                            tpk_last_booked = timezone.now(),
                            tpk_is_booked = False,
                            tpk_user = test_user)
        mockParkingSpace.return_value = testParkingSpace

        #setup test booking
        testBooking = BookingItems.objects.create(tpk_parkingspace = testParkingSpace, 
                        tpk_booking_user = test_user,
                        tpk_book_start_datetime = timezone.now() + timezone.timedelta(hours = 1),
                        tpk_book_end_datetime = timezone.now() + timezone.timedelta(hours = 2))
        mockBooking.return_value = testBooking

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_all_bookings(self, mockPerm):
        response = self.client.get('/users/testid/booking')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        bookings_user = BookingItems.objects.filter(tpk_booking_user = request_user)

        bookings_seria = BookingSerializer(bookings_user,many=True)
        book_json_resp = JsonResponse(bookings_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(book_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_create_right_booking(self, mockPerm):
        new_booking = {"tpk_parkingspace": 2,
                        "tpk_book_start_datetime": timezone.now() + timezone.timedelta(hours = 2, minutes = 15),
                        "tpk_book_end_datetime": timezone.now() + timezone.timedelta(hours = 3),
                        "tpk_booking_user": {"tpk_firebaseid": "testid"}}
        resp = self.client.post('/users/testid/booking', new_booking, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_create_wrong_booking(self, mockPerm):
        new_booking = {"tpk_parkingspace": 3,
                        #overlapping time slot
                        "tpk_book_start_datetime": timezone.now() + timezone.timedelta(hours = 1, minutes = 15), 
                        "tpk_book_end_datetime": timezone.now() + timezone.timedelta(hours = 2),
                        "tpk_booking_user": {"tpk_firebaseid": "testid"}}
        resp = self.client.post('/users/testid/booking', new_booking, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_one_booking_success(self, mockPerm):
        response = self.client.get('/users/testid/booking/7/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_one_booking_fault(self, mockPerm):
        response = self.client.get('/users/testid/booking/10/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_modify_booking(self, mockPerm):
        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        bookings_user = BookingItems.objects.filter(tpk_booking_user = request_user)

        bookings_seria = BookingSerializer(bookings_user,many=True)
        book_json_resp = JsonResponse(bookings_seria.data, safe=False)

        new_booking = {"tpk_parkingspace": 6,
                        #overlapping time slot
                        "tpk_book_start_datetime": timezone.now() + timezone.timedelta(hours = 1, minutes = 15), 
                        "tpk_book_end_datetime": timezone.now() + timezone.timedelta(hours = 2),
                        "tpk_booking_user": {"tpk_firebaseid": "testid"}}
        resp = self.client.put('/users/testid/booking/8/', new_booking, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_remove_booking(self, mockPerm):
        response = self.client.delete('/users/testid/booking/9/')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        response = self.client.get('/users/testid/booking')
        self.assertJSONEqual(str(response.content, encoding='utf8'), '[]')
