from re import S
from unittest.mock import patch
from django.http import JsonResponse

from ..models import ParkerMap
from ..serializers import MapSerializer
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status

class TestMapsModel(APITestCase):
    client = APIRequestFactory()
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.maps.models.ParkerMap.objects')
    def setUp(self, mockUser, mockPerm):
        mockPerm.return_value = True
        sampleCoords_1 = ParkerMap.objects.create(Lat_db="43.47221", Long_db="-80.54486")
        sampleCoords_2 = ParkerMap.objects.create(Lat_db="43.47620", Long_db="-80.54525")    

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_get(self, mockPerm):
        response = self.client.get('/map')

        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get data from DB
        all_Coords = ParkerMap.objects.all()
        # serialize, convert to json and compare against response.
        serializer = MapSerializer(data=all_Coords, many=True)
        if serializer.is_valid():
            Coord_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(Coord_json, response.content)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.maps.models.ParkerMap.objects')       
    def test_get_one(self, mockUser, mockPerm):
        sample_input = ParkerMap.objects.create(Lat_db="43.47620", Long_db="-80.54525")
        response = self.client.get('/map/1/')
        single_user = ParkerMap.objects.get(pk=1)
        serializer = MapSerializer(data=single_user, many=False)
        if serializer.is_valid():
            user_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(user_json, response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_post(self, mockPerm):
        resp = self.client.post("/map", {'Lat_db': "43.47620", "Long_db":"-80.54525"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_post_bad_request(self, mockPerm):
        resp = self.client.post("/map", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_put(self, mockPerm):
       resp = self.client.put("/map/5/", {"Lat_db": "43.47620", "Long_db":"-80.54525"}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_200_OK)
    
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_put_bad_request(self, mockPerm):
       resp = self.client.put("/map/5/", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_delete(self, mockPerm):
        sample_input3 = ParkerMap.objects.create(Lat_db="43.47620", Long_db="-80.54525")
        resp = self.client.delete('/map/1/')
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_get_nonexistent_user(self, mockPerm):
        resp = self.client.delete('/map/123456/')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
    