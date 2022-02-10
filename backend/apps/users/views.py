from django.http import JsonResponse
from .models import User
from .serializers import UserResponseSerializer

from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import status

from apps.parkersauth.permissions.IsUserLoggedIn import IsUserLoggedIn
from apps.users.services import firebase

@api_view(['GET'])
@permission_classes([IsUserLoggedIn])
def users_list(request):
    if request.method == 'GET':
        usersList = User.objects.all()
        userSerializer = UserResponseSerializer(usersList, many=True)
        return JsonResponse(userSerializer.data, safe=False)


@api_view(['PUT', 'GET', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def user_mod(request, pk):
    if request.method == 'GET' or request.method == 'DELETE' and request.user:
        try:
            user = User.objects.get(tpk_firebaseid=pk)
        except Exception as e:
            return JsonResponse({}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET' and request.user:
        userSer = UserResponseSerializer(user)
        return JsonResponse(userSer.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE' and request.user:
        user.tpk_isdeleted = True
        user.save()
        return JsonResponse({}, status=status.HTTP_202_ACCEPTED)

@api_view(['PUT'])
@permission_classes([AllowAny])
def new_user(request, pk):
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
        check_existing_user = User.objects.filter(tpk_email=newUser.tpk_email, tpk_isdeleted=False)
        if check_existing_user:
            return JsonResponse({}, status=status.HTTP_406_NOT_ACCEPTABLE)
        newUser.tpk_name = firebase_user['users'][0]['providerUserInfo'][0]['displayName']
        newUser.tpk_photoUrl = firebase_user['users'][0]['providerUserInfo'][0]['photoUrl']
        newUser.save()
        response = UserResponseSerializer(newUser, many=False)
        return JsonResponse(response.data, status=status.HTTP_201_CREATED)