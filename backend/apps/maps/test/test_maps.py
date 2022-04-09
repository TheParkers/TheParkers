from re import S
from unittest.mock import patch
from django.http import JsonResponse
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance  

from apps.maps.models import ParkerMap
from apps.maps.serializers import MapSerializer
from rest_framework.test import APITestCase
from rest_framework import status

class TestMapsModel(APITestCase):

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.maps.models.ParkerMap.objects.get')
    def setUp(self, mockMap, mockPerm):
        mockPerm.return_value = True
        mockMap.return_value = ParkerMap.objects.create(location=Point(43.47221, -80.54486))
        # ParkerMap.objects.create(location=Point(43.47223, -80.54487))
        # ParkerMap.objects.create(location=Point(43.47220, -80.54485))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_get(self, mockPerm):
        ParkerMap.objects.create(location=Point(13.47221, -29.11111))
        ParkerMap.objects.create(location=Point(31.4321, -92.1234))

        response = self.client.get('/map')
        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # get data from DB
        all_Coords = ParkerMap.objects.all()
        # serialize, convert to json and compare against response.
        serializer = MapSerializer(all_Coords, many=True)
        Coord_json = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'), str(Coord_json.content, encoding='utf8'))
        
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    @patch('apps.maps.models.ParkerMap.objects.get')
    def test_get_one(self, mockMap, mockPerm):
        mockMap.return_value = ParkerMap.objects.create(location=Point(43.47620, -80.54525))
        # Note in above, only location field is provided. rest are defaulting..
        map_entry = ParkerMap.objects.get(pk=1)
        response = self.client.get('/map/1/')
        serializer = MapSerializer(map_entry, many=False)
        map_entry_json = JsonResponse(serializer.data, safe=False)
        # print(ParkerMap.objects.filter(location__distance_lt=(Point(43.49620, -80.54525), Distance(m=5))))
        self.assertJSONEqual(map_entry_json.content.decode('utf-8'),response.content.decode('utf-8'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_post(self, mockPerm):
        resp = self.client.post("/map", {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [5.0, 6.0]}, 'properties': {}}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
#
#    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
#    def test_post_bad_request(self, mockPerm):
#        resp = self.client.post("/map", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
#        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
    def test_put(self, mockPerm):
       resp = self.client.put("/map/3/", {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [11.0, 11.0]}, 'properties': {}}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_200_OK)
    
#    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
#    def test_put_bad_request(self, mockPerm):
#       resp = self.client.put("/map/5/", {'faultyParam': "43.47620", "faultyParam":"-80.54525"}, format='json')
#       self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
#
#    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
#    def test_delete(self, mockPerm):
#        sample_input3 = ParkerMap.objects.create(Point(3,3))
#        resp = self.client.delete('/map/1/')
#        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)#
#
#    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')
#    def test_get_nonexistent_user(self, mockPerm):
#        resp = self.client.delete('/map/123456/')
#        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)