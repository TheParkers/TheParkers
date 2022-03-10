from unittest.mock import patch
from django.http import JsonResponse
from django.contrib.gis.geos import Point

from apps.parkingspace.models import ParkingSpace, ParkingSpaceFeatures
from apps.maps.models import ParkerMap
from apps.users.models import User
from apps.parkingspace.serializers import ParkingSpaceSerializer
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone

class TestParkingSpaceModel(APITestCase):

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.models.User.objects.get')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def setUp(self, mock_user, mockParkingSpace, mock_perm):
        '''
        setup for test cases
        '''
        user_1 = User.objects.create(tpk_firebaseid="test_firebase_id",
                                    tpk_name="test",
                                    tpk_email="test_email@test.com")
        mock_user.return_value = user_1
        parkingspacefeature_1 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = True,
                                tpk_has_car_wash = False, tpk_has_indoor_parking = False)
        #note, other fields for map location are being defaulted.
        #you can provide the fields in create func as comma separated key values pair.
        map_location = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        mockParkingSpace.return_value = ParkingSpace.objects.create(tpk_parking_area = 100,
                                        tpk_has_features = True, tpk_vehicle_capacity = 1,
                                        tpk_ps_location = map_location,
                                        tpk_parking_features = parkingspacefeature_1,
                                        tpk_created_on = timezone.now(),
                                        tpk_last_booked = timezone.now(),
                                        tpk_is_booked = False,
                                        tpk_user = user_1)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_get(self, mock_perm, mock_service):
        '''
        test_get: Test get all parking spaces
        '''
        response = self.client.get('/parking')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspaces = ParkingSpace.objects.all()
        serializer = ParkingSpaceSerializer(parkingspaces, many=True)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(ps_json_resp.content, encoding='utf8'))


    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_get_one(self, mock_perm, mock_service):
        '''
        test_get_one: Test get one parking space.
        '''
        response = self.client.get('/parking/2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspace = ParkingSpace.objects.get(pk=2)
        serializer = ParkingSpaceSerializer(parkingspace)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(ps_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_post(self, mock_perm, mock_service):
        '''
        test_post: test posting with ID
        '''
        parking_space = {"tpk_parking_features":
                        {"tpk_parking_features_id": 2, "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}},
                        "tpk_rating": 1, "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1, "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False,
                        "tpk_user": {"tpk_firebaseid": "test_firebase_id"}}
        resp = self.client.post('/parking', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_put(self, mock_perm, mock_service):
        '''
        test_put: test creating 1 parking space.
        '''
        parking_space = {"tpk_parking_features": {"tpk_parking_features_id": 2, "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}}, "tpk_rating": 1,
                        "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1, "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False, "tpk_user": {"tpk_firebaseid": "test_firebase_id"}}
        resp = self.client.put('/parking/3/', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_post_from_non_existing_user(self, mock_perm, mock_service):
        '''
        test_post_from_non_existing_user: test negative scenario
        '''
        parking_space = {"tpk_parking_features": {"tpk_parking_features_id": 2, "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}}, "tpk_rating": 1, "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1, "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False, "tpk_user": {"tpk_firebaseid": "1234"}}
        resp = self.client.post('/parking', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_put_then_delete(self, mock_perm, mock_service):
        '''
        test_delete: delete a parking space
        '''
        resp = self.client.delete('/parking/8/')
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)
    
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_filter_parking_area(self, mock_perm, mock_service):
        response = self.client.get('/parking?tpk_parking_area=400')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspace = ParkingSpace.objects.get(pk=3)
        serializer = ParkingSpaceSerializer(parkingspace)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(ps_json_resp.content, encoding='utf8'))