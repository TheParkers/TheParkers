from re import S
from unittest import mock
from unittest.mock import patch
from django.http import JsonResponse

from ..models import User
from ..serializers import UserSerializer
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status

class TestUserModel(APITestCase):
    client = APIRequestFactory()
    @patch('apps.users.models.User.objects')
    def setUp(self, mockUser):
        sampleuser_1 = User.objects.create(tpk_firebaseid="testid", tpk_name="test", tpk_email="test_email@test.com") 

    def test_get(self):
        response = self.client.get('/users/')

        # assert response code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get data from DB
        all_users = User.objects.all()
        # serialize, convert to json and compare against response.
        serializer = UserSerializer(data=all_users, many=True)
        if serializer.is_valid():
            users_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(users_json, response.content)

    @patch('apps.users.models.User.objects')       
    def test_get_one(self, mockUser):
        testuser_3 = User.objects.create(tpk_firebaseid="testid", tpk_name="test", tpk_email="test_email@test.com") 
        response = self.client.get('/users/1/')
        single_user = User.objects.get(pk=1)
        serializer = UserSerializer(data=single_user, many=False)
        if serializer.is_valid():
            user_json = JsonResponse(serializer.data, safe=False)
            self.assertJSONEqual(user_json, response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        resp = self.client.post("/users/", {'tpk_firebaseid': "PutUser_1"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
    
    def test_post_bad_request(self):
        resp = self.client.post("/users/", {'tpk_firebaseidinvalidkey': "PutUser_1"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.users.services.firebase.getUserProfileByToken')
    def test_put(self, mockService):
        mockService.return_value = {"users":[{"providerUserInfo":[{"rawId": "PutUser_1",  
                                    "email": "test@test.com", "displayName": 
                                    "test", "photoUrl": "test"}]}]}
        resp = self.client.put("/users/PutUser_1/", {"tpk_firebaseid": "token"}, format='json')
        self.assertEqual('{"tpk_name": "test", "tpk_email": "test@test.com", "tpk_photoUrl": "test"}', str(resp.content, 'utf-8'))
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
    
    @patch('apps.users.services.firebase.getUserProfileByToken')
    def test_put_tokenauthentication_failed(self, mockService):
        mockService.return_value = {"users":[{"providerUserInfo":[{"rawId": "invalidToken",  
                                    "email": "test@test.com", "displayName": 
                                    "test", "photoUrl": "test"}]}]}
        resp = self.client.put("/users/5/", {"tpk_firebaseid": "PutUser_1"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
    
    def test_put_bad_request(self):
       resp = self.client.put("/users/5/", {'tpk_firebaseid_inavlidkey': "PutUser_1"}, format='json')
       self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        testuser_3 = User.objects.create(tpk_firebaseid="testid", tpk_name="test", tpk_email="test_email@test.com") 
        resp = self.client.delete('/users/1/')
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)

    def test_get_nonexistent_user(self):
        resp = self.client.delete('/users/123456/')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)