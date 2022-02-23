from re import S
from unittest.mock import patch
from django.http import JsonResponse
from django.contrib.auth.models import Group, Permission

from apps.users.models import User
from apps.users.serializers import PermissionSerializer, RoleSerializer
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status
from apps.users.permissions import assign_permissions_to_roles

class TestPermissions(APITestCase):
    @patch('apps.users.models.User.objects')
    def setUp(self, mockUser):
        sampleuser_1 = User.objects.create(tpk_firebaseid="testid",
                        tpk_name="test",
                        tpk_email="test_email@test.com")
        
    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_permissions(self, mockPerm):
        response = self.client.get('/permissions')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        request_user = User.objects.get(tpk_email = 'AnonymousUser')
        permissions_user = Permission.objects.filter(user = request_user)

        # Permissions that the user has via a group/role
        permissions_role = Permission.objects.filter(group__user = request_user)

        permissions_seria = PermissionSerializer(permissions_user.union(permissions_role),many=True)
        perm_json_resp = JsonResponse(permissions_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_role_permissions(self, mockPerm):
        assign_permissions_to_roles()
        user_role = Group.objects.get(name='VIEWER')
        request_user = User.objects.get(tpk_email = 'AnonymousUser')
        user_role.user_set.add(request_user)
        response = self.client.get('/permissions')
        permissions_listed = user_role.permissions.all()
        permissions_seria = PermissionSerializer(permissions_listed,many=True)
        perm_json_resp = JsonResponse(permissions_seria.data, safe=False)
        self.assertEqual(len(str(response.content, encoding='utf8')),
                            len(str(perm_json_resp.content, encoding='utf8')))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_user_role(self, mockPerm):
        response = self.client.get('/roles')
        request_user = User.objects.get(tpk_email = 'AnonymousUser')
        user_role = request_user.groups.all()
        roles_seria = RoleSerializer(user_role,many=True)
        perm_json_resp = JsonResponse(roles_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))
