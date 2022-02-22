'''
APIViews: parkingspace
'''
from django.http import JsonResponse

from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn
from apps.users.services import firebase
from .models import ParkingSpace
from .serializers import ParkingSpaceSerializer, ParkingSpaceFeaturesSerializer

@api_view(['GET'])
def parkingspace_list(request):
    '''
    API: parkingspace_list
    payload: {
    }
    success response: list<parkingspaces>
    '''
    if request.method == 'GET':
        parking_spaces = ParkingSpace.objects.all()
        serializer = ParkingSpaceSerializer(parking_spaces, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({request.data}, status=404)