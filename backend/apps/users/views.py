from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        usersList = User.objects.all()
        userSerializer = UserSerializer(usersList, many=True)
        return JsonResponse(userSerializer.data, safe=False)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'GET', 'DELETE'])
def user_mod(request, pk):

    if request.method == 'GET' or request.method == 'DELETE':
        try:
            user = User.objects.get(id=pk)
        except Exception as e:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user_data_ser = UserSerializer(data=request.data)
        if user_data_ser.is_valid():
            user_data_ser.save()
            return JsonResponse(user_data_ser.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(user_data_ser.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        userSer = UserSerializer(user)
        return JsonResponse(userSer.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=status.HTTP_202_ACCEPTED)
