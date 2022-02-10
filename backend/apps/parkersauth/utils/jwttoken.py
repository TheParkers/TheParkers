import datetime
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

def generate_access_token(user):
    access_token = RefreshToken.for_user(user)
    return access_token