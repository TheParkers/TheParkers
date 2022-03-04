'''
APIViews: maps
'''
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.parsers import JSONParser

from apps.maps.serializers import MapSerializer
from apps.maps.models import ParkerMap
from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn

@permission_classes([IsUserLoggedIn])
@api_view(['GET', 'POST'])
def get_all_maps(request):
    '''
    API: /map
    payload: {}
    GET:
        success response: list<Maps>, status.HTTP_200_OK
    POST:
        success response: map, status 201
    '''
    if request.method == 'GET':
        parker_maps = ParkerMap.objects.all()
        serializer = MapSerializer(parker_maps,many = True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({request.data}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'GET', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def mod_maps(request, parker_map_id):
    '''
    API: /'map/<int:pk>/
    payload: {}
    GET:
        success response: Map, status.HTTP_200_OK
    PUT:
        success response: Map, status HTTP_200_OK
    DELETE:
        success response: status HTTP_200_OK
    '''
    if "GET" in request.method or "DELETE" in request.method:
        try:
            parker_map = ParkerMap.objects.get(pk=parker_map_id)
        except ParkerMap.DoesNotExist:
            return JsonResponse({}, status=404)

    if request.method == 'GET':
        serializer = MapSerializer(parker_map, many=False)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse({}, status=400)

    if request.method == 'DELETE':
        parker_map.delete()
        return JsonResponse({}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse(serializer.errors, status=404)
