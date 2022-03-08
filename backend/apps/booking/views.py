# Create your views here.
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.parsers import JSONParser
from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn

from .models import BookingItems
from .serializers import BookingSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsUserLoggedIn])
def booking_list(request):
    if request.method == 'GET':
        bookings = BookingItems.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookingSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({request.data}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def booking_modify(request, tpk_booking_id):
    if "GET" in request.method or "DELETE" in request.method:
        try:
            booking = BookingItems.objects.get(pk=tpk_booking_id)
        except BookingItems.DoesNotExist:
            return JsonResponse({'error': 'Booking not found.'},
                                status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        booking = BookingItems.objects.get(pk=tpk_booking_id)
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
        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        booking.delete()
        return JsonResponse({'message': 'delete success'}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({'error': 'operation' + str(request.method) + ' failed.'},
                        status=status.HTTP_404_NOT_FOUND)














    if request.method == 'PUT':
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        data = JSONParser().parse(request)
        new_user_role = Group.objects.get(name=data["tpk_assign_role"])
        new_user_role.user_set.add(request_user)
        roles_listed = Group.objects.filter(user = request_user)
        role_serializer = RoleSerializer(roles_listed, many=True)
        return JsonResponse(role_serializer.data, safe=False, status=status.HTTP_202_ACCEPTED)

    if request.method == 'DELETE':
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        data = JSONParser().parse(request)
        remove_user_role = Group.objects.get(name=data["tpk_remove_role"])
        remove_user_role.user_set.remove(request_user)
        roles_listed = Group.objects.filter(user = request_user)
        role_serializer = RoleSerializer(roles_listed, many=True)
        return JsonResponse(role_serializer.data, safe=False, status=status.HTTP_202_ACCEPTED)