from unittest.mock import patch
from django.http import JsonResponse

from apps.maps.models import GCoordList
from apps.maps.serializers import MapSerializer
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status

class TestUserModel(APITestCase):
    client = APIRequestFactory()
    @patch('maps.models.GCoordList.objects')
    def setUp(self, mockUser):
        sampleCoords_1 = GCoordList.objects.create(Lat_db="43.47221", Long_db="-80.54486")
        sampleCoords_2 = GCoordList.objects.create(Lat_db="43.47620", Long_db="-80.54525")    

    
    def test_get(self):
        response = self.client.get('/map/')

        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get data from DB
        all_Coords = GCoordList.objects.all()
        # serialize, convert to json and compare against response.
        serializer = MapSerializer(data=all_Coords, many=True)
        if serializer.is_valid():
            Coord_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(Coord_json, response.content)
    
    @patch('maps.models.GCoordList.objects')       
    def test_get_one(self, mockUser):
        sample_input = GCoordList.objects.create(Lat_db="43.47620", Long_db="-80.54525")
        response = self.client.get('/map/1/')
        single_user = GCoordList.objects.get(pk=1)
        serializer = MapSerializer(data=single_user, many=False)
        if serializer.is_valid():
            user_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(user_json, response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_post(self):
        resp = self.client.post("/map/", {'Lat_db': "43.47620", "Long_db":"-80.54525"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
    
    def test_post_bad_request(self):
        resp = self.client.post("/map/", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put(self):
       resp = self.client.put("/map/5/", {"Lat_db": "43.47620", "Long_db":"-80.54525"}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_200_OK)
    
    def test_put_bad_request(self):
       resp = self.client.put("/map/5/", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        sample_input3 = GCoordList.objects.create(Lat_db="43.47620", Long_db="-80.54525")
        # print(sample_input3)
        resp = self.client.delete('/map/1/')
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)

    def test_get_nonexistent_user(self):
        resp = self.client.delete('/map/123456/')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
    