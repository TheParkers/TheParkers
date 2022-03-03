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
    @patch('apps.users.models.User.objects.get')
    def setUp(self, mockUser):
        test_user = User.objects.create(tpk_firebaseid="testid",
                        tpk_name="test",
                        tpk_email="test_email@test.com")
        assign_permissions_to_roles()
        mockUser.return_value = test_user
        user_role = Group.objects.get(name='VIEWER')
        user_role.user_set.add(test_user)

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_permissions(self, mockPerm):
        response = self.client.get('/users/testid/permissions')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        permissions_user = Permission.objects.filter(user = request_user)

        # Permissions that the user has via a group/role
        permissions_role = Permission.objects.filter(group__user = request_user)

        permissions_seria = PermissionSerializer(permissions_user.union(permissions_role),many=True)
        perm_json_resp = JsonResponse(permissions_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_role_permissions(self, mockPerm):
        response = self.client.get('/users/testid/permissions')
        user_role = Group.objects.get(name='VIEWER')
        permissions_listed = user_role.permissions.all()
        permissions_seria = PermissionSerializer(permissions_listed,many=True)
        perm_json_resp = JsonResponse(permissions_seria.data, safe=False)
        self.assertEqual(len(str(response.content, encoding='utf8')),
                            len(str(perm_json_resp.content, encoding='utf8')))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_get_user_role(self, mockPerm):
        response = self.client.get('/users/testid/roles')
        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        user_role = request_user.groups.all()
        roles_seria = RoleSerializer(user_role,many=True)
        perm_json_resp = JsonResponse(roles_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_assign_role(self, mockPerm):
        response = self.client.put('/users/testid/roles', {"tpk_assign_role": "SUPERUSER"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        
        #compare roles
        response = self.client.get('/users/testid/roles')
        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        user_role = request_user.groups.all()
        roles_seria = RoleSerializer(user_role,many=True)
        perm_json_resp = JsonResponse(roles_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))

        #compare permissions
        response = self.client.get('/users/testid/permissions')
        old_user_role = Group.objects.get(name='VIEWER')
        new_user_role = Group.objects.get(name='SUPERUSER')
        old_permissions_listed = old_user_role.permissions.all()
        new_permissions_listed = new_user_role.permissions.all()
        permissions_seria = PermissionSerializer(old_permissions_listed.union(new_permissions_listed), many=True)
        perm_json_resp = JsonResponse(permissions_seria.data, safe=False)
        self.assertEqual(len(str(response.content, encoding='utf8')),
                            len(str(perm_json_resp.content, encoding='utf8')))

    @patch('apps.parkersauth.permissions.isuserloggedin.IsUserLoggedIn.has_permission')     
    def test_remove_role(self, mockPerm):
        response = self.client.delete('/users/testid/roles', {"tpk_remove_role": "SUPERUSER"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        
        #compare roles
        response = self.client.get('/users/testid/roles')
        request_user = User.objects.get(tpk_email = 'test_email@test.com')
        user_role = request_user.groups.all()
        roles_seria = RoleSerializer(user_role,many=True)
        perm_json_resp = JsonResponse(roles_seria.data, safe=False)
        self.assertJSONEqual(str(response.content, encoding='utf8'),
                            str(perm_json_resp.content, encoding='utf8'))
