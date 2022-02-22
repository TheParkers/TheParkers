from unittest.mock import patch
from django.http import JsonResponse

from apps.parkingspace.models import ParkingSpace, ParkingSpaceFeatures
from apps.parkingspace.serializers import ParkingSpaceSerializer
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone

class TestParkingSpaceModel(APITestCase):
    @patch('apps.users.models.User.objects.get')
    def setUp(self, mockParkingSpace):
        parkingspacefeature_1 = ParkingSpaceFeatures.objects.create(has_car_charging = True,
                                has_car_wash = False, has_indoor_parking = False)
        mockParkingSpace.return_value = ParkingSpace.objects.create(parking_area = 100,
                                        has_features = True, vehicle_capacity = 1,
                                        address = "200 University Avenue West", city = "Waterloo",
                                        country = "Canada", area_code = "N2L6P1",
                                        lat = 20.0001, long = 31.1234,
                                        parking_features = parkingspacefeature_1,
                                        created_on = timezone.now(),
                                        last_booked = timezone.now(),
                                        is_booked = False)

    def test_get(self):
        response = self.client.get('/parking')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        parkingspaces = ParkingSpace.objects.all()
        serializer = ParkingSpaceSerializer(parkingspaces, many=True)
        #note that the get returns queryset, so we are using many=True.
        ps_json_resp = JsonResponse(serializer.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(ps_json_resp.content, encoding='utf8'))
                            