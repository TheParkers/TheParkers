'''
APIViews: parkingspace
'''
from django.http import JsonResponse

from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from apps.users.services import firebase
from .models import ParkingSpace
from .serializers import ParkingSpaceSerializer
from .filters import ParkingSpaceFilter
from django_filters.utils import translate_validation
from rest_framework.pagination import PageNumberPagination



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

        filterset = ParkingSpaceFilter(request.GET, queryset=parking_spaces)
        if not filterset.is_valid():
            raise translate_validation(filterset.errors)
        serializer = ParkingSpaceSerializer(filterset.qs, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({request.data}, status=404)
    