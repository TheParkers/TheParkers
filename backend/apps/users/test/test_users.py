from unittest import mock
from unittest.mock import patch
from django.test import TestCase
from django.urls import reverse
from django.http import JsonResponse

from ..models import User
from ..serializers import UserSerializer
from rest_framework.test import APITestCase, RequestsClient
from rest_framework import status

class TestUserModel(APITestCase):
    @patch('apps.users.models.User.objects')
    def setUp(self, mockUser):
        sampleuser_1 = User.objects.create(userName="TestUser2", userType="root")
        sampleuser_2 = User.objects.create(userName="TestUser3", userType="guest")    

    def test_get(self):
        response = self.client.get('http://testserver/users/')

        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get data from DB
        all_users = User.objects.all()
        # serialize, convert to json and compare against response.
        serializer = UserSerializer(data=all_users, many=True)
        if serializer.is_valid():
            users_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(users_json, response.content)
            
    def test_get_one(self):
        testuser_3 = User.objects.create(userName="TestUser2", userType="root")
        response = self.client.get('http://testserver/users/1')
        data = response.json()
        self.assertEqual(data.get('userName'), testuser_3.userName)
        self.assertEqual(data.get('userType'), testuser_3.userType)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
