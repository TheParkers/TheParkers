'''
APIViews: users
'''
from django.http import JsonResponse

from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn
from apps.users.services import firebase
from .models import User
from .serializers import UserResponseSerializer

@api_view(['GET'])
@permission_classes([IsUserLoggedIn])
def users_list(request):
    '''
    API: users_list
    payload: {
    }
    success response: list<User>
    '''
    if request.method == 'GET':
        parker_users = User.objects.all()
        user_serializer = UserResponseSerializer(parker_users, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    return JsonResponse({request.data}, status=404)


@api_view(['GET', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def user_mod(request, firebase_user_id):
    '''
    API: users/<str:pk>
    urlparam: pk
    payload: {
        }
    GET:
        success response: User, status.HTTP_200_OK
    DELETE:
            success response: status.HTTP_202_ACCEPTED
    '''
    if request.method == 'GET' or request.method == 'DELETE' and request.user:
        try:
            user = User.objects.get(tpk_firebaseid=firebase_user_id)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=404)

    if request.method == 'GET' and request.user:
        user_ser = UserResponseSerializer(user)
        return JsonResponse(user_ser.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE' and request.user:
        user.tpk_isdeleted = True
        user.save()
        return JsonResponse({}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({request.data}, status=404)

@api_view(['PUT'])
@permission_classes([AllowAny])
def new_user(request, firebase_user_id):
    '''
    API: users/register/<str:pk>
    urlparam: pk
    payload: {
            tpk_firebaseid
        }
    PUT:
        success response: User, status.HTTP_201_CREATED
    '''
    if request.method == 'PUT':
        try:
            token = request.data['tpk_firebaseid']
            firebase_user = firebase.get_user_profile_bytoken(token)
        except Exception as error:
            print(error)
            return JsonResponse({}, status=400)
        new_parker_user = User()
        new_parker_user.tpk_firebaseid = firebase_user['users'][0]['localId']
        if firebase_user_id != new_parker_user.tpk_firebaseid:
            return JsonResponse({}, status=503)

        new_parker_user.tpk_email = firebase_user['users'][0]['providerUserInfo'][0]['email']
        check_existing_user = User.objects.filter(tpk_email=new_parker_user.tpk_email,
                                                    tpk_isdeleted=False)
        if check_existing_user:
            return JsonResponse({}, status=406)
        new_parker_user.tpk_name = firebase_user['users'][0]['providerUserInfo'][0]['displayName']
        new_parker_user.tpk_photoUrl = firebase_user['users'][0]['providerUserInfo'][0]['photoUrl']
        new_parker_user.save()
        response = UserResponseSerializer(new_parker_user, many=False)
        return JsonResponse(response.data, status=201)
    return JsonResponse({}, status=404)
