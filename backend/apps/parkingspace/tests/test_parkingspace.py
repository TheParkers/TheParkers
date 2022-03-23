'''
Tests for this app
'''
from unittest.mock import patch
from django.http import JsonResponse
from django.contrib.gis.geos import Point
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.parkingspace.models import ParkingSpace, ParkingSpaceFeatures, ParkingSpaceImages
from apps.maps.models import ParkerMap
from apps.users.models import User
from apps.parkingspace.serializers import ParkingSpaceSerializer
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
import json

class TestParkingSpaceModel(APITestCase):
    '''
    Tests for this app
    '''
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
        user_2 = User.objects.create(tpk_firebaseid="test_firebase_id2",
                                    tpk_name="test2",
                                    tpk_email="test_email2@test.com")
        mock_user.return_value = user_1
        parkingspacefeature_1 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = True,
                                tpk_has_car_wash = False, tpk_has_indoor_parking = False)
        parkingspacefeature_2 = ParkingSpaceFeatures.objects.create(tpk_has_car_charging = False,
                                tpk_has_car_wash = True, tpk_has_indoor_parking = False)
        file = 'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

        #note, other fields for map location are being defaulted.
        #you can provide the fields in create func as comma separated key values pair.
        map_location = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        map_location2 = ParkerMap.objects.create(
                        location=Point(43.47720, -80.54625),
                        city = "London")

        mockParkingSpace.return_value = ParkingSpace.objects.create(tpk_parking_area = 100,
                                        tpk_has_features = True, tpk_vehicle_capacity = 1,
                                        tpk_ps_location = map_location,
                                        tpk_parking_features = parkingspacefeature_1,
                                        tpk_created_on = timezone.now(),
                                        tpk_last_booked = timezone.now(),
                                        tpk_is_booked = False,
                                        tpk_user = user_1)
        
        ParkingSpace.objects.create(tpk_parking_area = 500, 
                                        tpk_has_features = True, tpk_vehicle_capacity = 1,
                                        tpk_ps_location = map_location2,
                                        tpk_parking_features = parkingspacefeature_2,
                                        tpk_created_on = timezone.now(),
                                        tpk_last_booked = timezone.now(),
                                        tpk_is_booked = False,
                                        tpk_user = user_2)

        parkingspace_image_1 = ParkingSpaceImages.objects.create(
                               tpk_parkingspace=mockParkingSpace.return_value,
                               tpk_base64_image=file)
        parkingspace_image_2 = ParkingSpaceImages.objects.create(
                               tpk_parkingspace=mockParkingSpace.return_value,
                               tpk_base64_image=file)
        parkingspace_images = [parkingspace_image_1, parkingspace_image_2]
        mockParkingSpace.return_value.tpk_parkingspace_images.set(parkingspace_images)

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
        get_resp = json.loads(self.client.get('/parking').content)
        id = get_resp[0]['id']
        response = self.client.get('/parking/'+ str(id) +'/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspace = ParkingSpace.objects.get(pk=id)
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
        file = 'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEA11=='
        parking_space = {"tpk_parking_features":
                        {"tpk_parking_features_id": 2, "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}},
                        "tpk_rating": 1,
                        "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1,
                        "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False,
                        "tpk_user": {"tpk_firebaseid": "test_firebase_id"},
                        "tpk_parkingspace_images": [{"id": 3, "tpk_base64_image": file},
                        {"id": 4, "tpk_base64_image": file}]}
        resp = self.client.post('/parking', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_put(self, mock_perm, mock_service):
        '''
        test_put: test creating 1 parking space.
        '''
        file = "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"
        parking_space = {"tpk_parking_features": {"tpk_parking_features_id": 2, "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}}, "tpk_rating": 1,
                        "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1,
                        "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False, "tpk_user": {"tpk_firebaseid": "test_firebase_id"},
                        "tpk_parkingspace_images": [{"id": 3, "tpk_base64_image": file}],
                        "tpk_price_per_hour": 2.334455,
                        "tpk_access_information": "Take left from DC Library"}
        resp = self.client.put('/parking/3/', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_post_from_non_existing_user(self, mock_perm, mock_service):
        '''
        test_post_from_non_existing_user: test negative scenario
        '''
        file = "R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEA11=="
        parking_space = {"tpk_parking_features": {"tpk_parking_features_id": 2,
                        "tpk_has_car_charging": True,
                        "tpk_has_car_wash": False, "tpk_has_indoor_parking": False},
                        "tpk_ps_location": {"ps_location_id": 3, 'type': 'Feature',
                        'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]},
                        'properties': {}}, "tpk_rating": 1,
                        "tpk_description": "very good parking space",
                        "tpk_parking_area": 100.0, "tpk_has_features": True,
                        "tpk_vehicle_capacity": 1,
                        "tpk_created_on": "2021-02-25T16:19:57.377092Z",
                        "tpk_last_booked": "2022-02-25T16:19:57.376731Z",
                        "tpk_is_booked": False, "tpk_user": {"tpk_firebaseid": "1234"},
                        "tpk_parkingspace_images": [{"id": 3, "tpk_base64_image": file}]}
        resp = self.client.post('/parking', parking_space, format='json')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_put_then_delete(self, mock_perm, mock_service):
        '''
        test_delete: delete a parking space.
        '''
        get_resp = json.loads(self.client.get('/parking').content)
        resp = self.client.delete('/parking/'+ str(get_resp[0]['id']) + '/')
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_filter_parking_area(self, mock_perm, mock_service):
        '''
        test_filter_parking_area: Filter parking area
        '''
        response = self.client.get('/parking?tpk_parking_area__gte=400')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspace = ParkingSpace.objects.get(tpk_parking_area = 500)
        serializer = ParkingSpaceSerializer(parkingspace)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8').strip('[]'),
                            str(ps_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_filter_city(self, mock_perm, mock_service):
        '''
        test_filter_city: Filter based on city
        '''
        response = self.client.get('/parking?tpk_ps_location__city__iexact=london')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspace = ParkingSpace.objects.get(tpk_parking_area = 500)
        serializer = ParkingSpaceSerializer(parkingspace)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8').strip('[]'),
                            str(ps_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')
    def test_get_filtered_by_radius(self, mock_perm, mock_service):
        '''
        test_get_filtered_by_radius: Get parking within radius of lat long provided
        '''
        # response = self.client.get('/parking?long=43.476083&lat=-80.544851')
        response = self.client.get('/parking',{'long': 43.476083,'lat': -80.544851})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspaces = ParkingSpace.objects.all()
        serializer = ParkingSpaceSerializer(parkingspaces, many=True)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(ps_json_resp.content, encoding='utf8'))
                            