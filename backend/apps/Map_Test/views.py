from django.shortcuts import render
from Map_Test.serializers import MapSerializer
# from .forms import LatLong
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from Map_Test.models import GCoordList
from rest_framework.parsers import JSONParser
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from apps.parkersauth.permissions.IsUserLoggedIn import IsUserLoggedIn

# Create your views here.

'''
create a form with inputs lat and long and stores it to the database
grab the list of lat and long from the DB and display it on the map

'''

@csrf_exempt
@permission_classes([IsUserLoggedIn])
@api_view(['GET', 'POST'])
def LatLongList(request):
    if request.method == 'GET':
        Coords = GCoordList.objects.all()
        serializer = MapSerializer(Coords,many = True)
        return JsonResponse(serializer.data, safe=False)
        
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['PUT', 'GET', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def LatLongMod(request, pk):
    # Loc = GCoordList.objects.all()
    # LatLongPairs = []
    # for i in Loc:
    #     LatLongPairs.append([float(i.Lat_db),float(i.Long_db)])
    # print(LatLongPairs)
    
    # context = {
    #     "CoordList" : LatLongPairs,
    #     }

    # return render(request, 'map.html', context)
    if request.method == "GET" or request.method == "DELETE":
        try:
            Coords = GCoordList.objects.get(pk=pk)
        except GCoordList.DoesNotExist:
            return HttpResponse(status=404)

    
    if request.method == 'GET':
        
        serializer = MapSerializer(Coords)
        # print(serializer.data)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':

        data = JSONParser().parse(request)
        serializer = MapSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        Coords.delete()
        return JsonResponse({}, status=status.HTTP_202_ACCEPTED)

    
    
