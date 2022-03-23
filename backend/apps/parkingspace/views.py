'''
APIViews: parkingspace
'''
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.parsers import JSONParser

from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn
from .models import ParkingSpace, ParkingSpaceImages
from .serializers import ParkingSpaceSerializer
from .filters import ParkingSpaceFilter
from django_filters.utils import translate_validation
from rest_framework.pagination import PageNumberPagination
from apps.booking.models import BookingItems
from datetime import datetime as dt
from django.utils import timezone
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance  

#currently only logged in users can get and post.
#TODO separate api view get and post according to perms
@api_view(['GET', 'POST'])
@permission_classes([IsUserLoggedIn])
def parkingspace_list(request):
    """
    API: parkingspace_list and filter
    payload: {
    }
    success response: list<parkingspaces>
    """
    if request.method == 'GET':
        queryset = ParkingSpace.objects.all()
        tpk_book_start_datetime = request.GET.getlist('tpk_book_start_datetime')
        tpk_book_end_datetime = request.GET.getlist('tpk_book_end_datetime')
        if tpk_book_start_datetime:
            tpk_book_start_datetime = tpk_book_start_datetime[0]
        if tpk_book_end_datetime:
            tpk_book_end_datetime = tpk_book_end_datetime[0]
        if tpk_book_end_datetime and tpk_book_start_datetime:
            #the format is unixtimestamp.
            #we convert it back to the tz aware datetime.
            tpk_book_start_datetime = dt.utcfromtimestamp(int(tpk_book_start_datetime)).replace(
                                      tzinfo=timezone.utc)
            tpk_book_end_datetime   = dt.utcfromtimestamp(int(tpk_book_end_datetime)).replace(
                                      tzinfo=timezone.utc)
            start_time_overlapping_bookings_qs = BookingItems.objects.filter(
                                              tpk_book_start_datetime__lte=
                                              tpk_book_start_datetime).filter(
                                              tpk_book_end_datetime__gte=tpk_book_start_datetime)
            end_time_overlapping_bookings_qs = BookingItems.objects.filter(
                                            tpk_book_start_datetime__lte=
                                            tpk_book_end_datetime).filter(
                                            tpk_book_end_datetime__gte=tpk_book_end_datetime)
            bookings_qs = start_time_overlapping_bookings_qs.union(
                          end_time_overlapping_bookings_qs)
            ids = [booking.tpk_parkingspace_id for booking in bookings_qs]
            queryset = queryset.exclude(id__in=ids)
        
        radius = 200.0
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('long'))
        point = Point(lng,lat)
        # print(point)

        queryset = queryset.filter(tpk_ps_location__location__distance_lt=(point, Distance(m=radius)))

        filterset = ParkingSpaceFilter(request.GET, queryset=queryset)
        if not filterset.is_valid():
            raise translate_validation(filterset.errors)
        serializer = ParkingSpaceSerializer(filterset.qs, many=True)
        return JsonResponse(serializer.data, safe=False)

    """
    API: parkingspace POST
    payload: {
        parking_space object in json format
    }
    success response: response code 201 CREATED.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ParkingSpaceSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({request.data}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def parkingspace_modify(request, parkingspace_id):
    """
    API: parkingspace_modify
    payload: {
    }
    success response: parkingspace
    """
    if "GET" in request.method or "DELETE" in request.method:
        try:
            parking_space = ParkingSpace.objects.get(pk=parkingspace_id)
        except ParkingSpace.DoesNotExist:
            return JsonResponse({'error': 'Parking space not found.'},
                                status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        parking_space = ParkingSpace.objects.get(pk=parkingspace_id)
        serializer = ParkingSpaceSerializer(parking_space)
        return JsonResponse(serializer.data, safe=False)

    """
    API: parkingspace PUT
    payload: {
        parking_space object in json format
    }
    success response: response code 201 CREATED.
    """
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ParkingSpaceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        parking_space.delete()
        return JsonResponse({'messaage': 'delete success'}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({'error': 'operation' + str(request.method) + ' failed.'},
                        status=status.HTTP_404_NOT_FOUND)
