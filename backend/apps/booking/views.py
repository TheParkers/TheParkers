# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn
from apps.users.models import User
from .models import BookingItems
from .serializers import BookingSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsUserLoggedIn])
def booking_list(request, firebase_user_id):
    '''
    Get View
    '''
    if request.method == 'GET':
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        bookings = BookingItems.objects.filter(tpk_booking_user = request_user)
        serializer = BookingSerializer(bookings, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookingSerializer(data = data)
        try:
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            print(serializer.errors)
        except:
            return JsonResponse({'error': 'Booking overlaps with existing one.'},
                                status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({request.data}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def booking_modify(request, firebase_user_id, tpk_booking_id):
    try:
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        booking = BookingItems.objects.get(pk=tpk_booking_id,tpk_booking_user = request_user)
    except BookingItems.DoesNotExist:
        return JsonResponse({'error': 'Booking not found.'},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BookingSerializer(booking)
        return JsonResponse(serializer.data, safe=False)

    """
    API: booking PUT
    payload: {
        booking object in json format
    }
    success response: response code 201 CREATED.
    """
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = BookingSerializer(booking, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        booking.delete()
        return JsonResponse({'message': 'delete success'}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({'error': 'operation' + str(request.method) + ' failed.'},
                        status=status.HTTP_404_NOT_FOUND)
