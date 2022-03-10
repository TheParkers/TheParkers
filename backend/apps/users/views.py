'''
APIViews: users
'''
from django.http import JsonResponse
from django.contrib.auth.models import Group, Permission

from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status

from apps.parkersauth.permissions.isuserloggedin import IsUserLoggedIn
from apps.users.services import firebase
from .models import User
from .serializers import UserResponseSerializer, PermissionSerializer, RoleSerializer

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
            user = User.objects.get(tpk_email=firebase_user_id)
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
@authentication_classes([])
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

@api_view(['GET'])
@permission_classes([IsUserLoggedIn])
def permissions_list(request, firebase_user_id):
    if request.method == 'GET':
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        permissions_user = Permission.objects.filter(user = request_user)
        # Permissions that the user has via a group/role
        permissions_role = Permission.objects.filter(group__user = request_user)

        permissions_seria = PermissionSerializer(permissions_user.union(permissions_role),many=True)
        return JsonResponse(permissions_seria.data, safe=False)

    return JsonResponse({request.data}, status=404)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsUserLoggedIn])
def roles_list(request, firebase_user_id):
    if request.method == 'GET':
        request_user = User.objects.get(tpk_firebaseid = firebase_user_id)
        roles_listed = Group.objects.filter(user = request_user)
        role_serializer = RoleSerializer(roles_listed, many=True)
        return JsonResponse(role_serializer.data, safe=False)

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

    return JsonResponse({}, status=404)
    