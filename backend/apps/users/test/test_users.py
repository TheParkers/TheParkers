from django.test import TestCase
from django.urls import reverse
from django.http import HttpResponse, JsonResponse

from ..models import User
from ..serializers import UserSerializer
from rest_framework.test import APITestCase, RequestsClient
from rest_framework import status

class TestUserModel(APITestCase):

    client = RequestsClient()

    def setUp(self):
        User.objects.create(userName="TestUser1", userType="admin")
        User.objects.create(userName="TestUser2", userType="root")
        User.objects.create(userName="TestUser3", userType="guest")    

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
        response = self.client.get('http://testserver/users/1')

        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get data from DB
        single_user = User.objects.get(id=1)
        # serialize, convert to json and compare against response.
        serializer = UserSerializer(data=single_user)
        if serializer.is_valid():
            users_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(users_json, response.content)
