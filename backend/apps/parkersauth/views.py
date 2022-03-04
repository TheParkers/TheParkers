'''
APIViews: auth
'''
from django.http import JsonResponse
import jwt
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, authentication_classes,  permission_classes
from rest_framework import status

from apps.parkersauth.utils.jwttoken import generate_access_token
from apps.users.services import firebase
from apps.users.serializers import UserResponseSerializer
from apps.users.models import User as ParkerUser
from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def sign_in(request):
    '''
    API: signin
    payload: {
        'tpk': tpk_firebaseid
    }
    success response: { "user": ,
                        "parker_token": }
    '''
    if request.method == 'POST':
        try:
            token = request.data['tpk_firebaseid']
            firebase_user = firebase.get_user_profile_bytoken(token)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=400)
        login_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        try:
            parker_user = ParkerUser.objects.get(tpk_email=login_email, tpk_isdeleted=False)
        except Exception as error:
            print(error)
            return JsonResponse({},status=400)
        parker_token = generate_access_token(parker_user)
        response = { "user": UserResponseSerializer(parker_user, many=False).data,
                    "parker_token": str(parker_token.access_token) }
        return JsonResponse(response, status=status.HTTP_200_OK)
    return JsonResponse({}, status=404)

@api_view(['GET'])
@permission_classes([IsUserLoggedIn])
def getSignedUser(request):
    try:
        token = str(request.auth)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
    except Exception as error:
        print(error)
        return JsonResponse({}, status=400)
    try:
        signeduser = ParkerUser.objects.get(tpk_email=payload['tpk_email'])
        response = UserResponseSerializer(signeduser, many=False).data
        return JsonResponse(response, status=status.HTTP_200_OK)
    except ParkerUser.DoesNotExist:
        return JsonResponse({}, status=401)
