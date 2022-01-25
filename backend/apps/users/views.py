from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .models import User
from .serializers import UserSerializer

def users_list(request):
    if request.method == 'GET':
        usersList = User.objects.all()
        userSerializer = UserSerializer(usersList, many=True)
        return JsonResponse(userSerializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

def user_mod(request, pk):

    try:
        user = User.objects.get(pk=pk)
    except Exception as e:
        return HttpResponse(status=404)
        print(e)
    
    if request.method == 'GET':
        userSer = UserSerializer(user)
        return JsonResponse(userSer.data)

    if request.method == 'DELETE':
        user.delete()

    if request.method == 'PUT':
        user_data = JSONParser.parse(request.data)
        user_data_ser = UserSerializer(data=user_data)
        if user_data_ser.is_valid():
            user_data_ser.save()
            return JsonResponse(user_data_ser.data, status=201)
        else:
            return JsonResponse(user_data_ser.errors, status=400)
# Create your views here.
