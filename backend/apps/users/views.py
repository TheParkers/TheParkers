from hashlib import new
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserResponseSerializer, UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny
from apps.users.services import firebase

@permission_classes([AllowAny])
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
            user = User.objects.get(pk=pk)
        except Exception as e:
            return JsonResponse({}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        try:
            token = request.data['tpk_firebaseid']
            firebase_user = firebase.getUserProfileByToken(token)
        except Exception as e:
            return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)
        newUser = User()
        newUser.tpk_firebaseid = firebase_user['users'][0]['providerUserInfo'][0]['rawId']

        if pk != newUser.tpk_firebaseid:
            return JsonResponse({}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        newUser.tpk_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        newUser.tpk_name = firebase_user['users'][0]['providerUserInfo'][0]['displayName']
        newUser.tpk_photoUrl = firebase_user['users'][0]['providerUserInfo'][0]['photoUrl']
        newUser.save()
        print('it came here')
        response = UserResponseSerializer(newUser, many=False)
        return JsonResponse(response.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        userSer = UserSerializer(user)
        return JsonResponse(userSer.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=status.HTTP_202_ACCEPTED)
            # except Exception as e:
