from django.shortcuts import render
from django.http import JsonResponse

from apps.users.models import User
from apps.users.serializers import UserResponseSerializer
from apps.parkersauth.utils.jwttoken import generate_access_token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, authentication_classes,  permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import AllowAny
from apps.users.services import firebase


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def signIn(request):
    if request.method == 'POST':
        try:
            token = request.data['tpk_firebaseid']
            firebase_user = firebase.getUserProfileByToken(token)
        except Exception as e:
            return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)
        login_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        try:
            parker_user = User.objects.get(tpk_email=login_email, tpk_isdeleted=False)
        except Exception as e:
            return JsonResponse({},status=status.HTTP_400_BAD_REQUEST)
        parker_token = generate_access_token(parker_user)
        response = { "user": UserResponseSerializer(parker_user, many=False).data, "parker_token": str(parker_token.access_token) }
        return JsonResponse(response, status=status.HTTP_200_OK)