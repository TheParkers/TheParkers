from django.db import models
from rest_framework.test import APITestCase, APIRequestFactory
from unittest.mock import patch
from rest_framework import status
from apps.users.models import User

class TestAuthModule(APITestCase):
    client = APIRequestFactory()
    def setUp(self):
        pass

    @patch('apps.users.models.User.objects.get')
    @patch('rest_framework_simplejwt.tokens.RefreshToken.for_user')
    @patch('apps.users.services.firebase.get_user_profile_bytoken')   
    def testSignIn(self, mockService, mockToken, mockUsers):
        mockService.return_value = {"users":[{"providerUserInfo":[{"rawId": "PutUser_1",  
                                    "email": "test@test.com", "displayName": 
                                    "test", "photoUrl": "test"}]}]}
        mockUsers.return_value = {"tpk_email": "test", "tpk_name": "testname", "tpk_isdeleted": False}
        Object = lambda **kwargs: type("Object", (), kwargs)
        person = Object(access_token = "test token")
        mockToken.return_value = person
        resp = self.client.post("/signin/", {"tpk_firebaseid": "token"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
  
    def testSignInBadRequest(self):
        resp = self.client.post("/signin/", {"tpk_firebasetoken_invalidparam": "token"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('apps.users.services.firebase.get_user_profile_bytoken')   
    def testSignInUserNotFound(self, mockService):
        mockService.return_value = {"users":[{"providerUserInfo":[{"rawId": "PutUser_1",  
                                    "email": None, "displayName": 
                                    "test", "photoUrl": "test"}]}]}
        resp = self.client.post("/signin/", {"tpk_firebaseid": "token"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)