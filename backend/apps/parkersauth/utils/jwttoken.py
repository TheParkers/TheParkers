'''
Utility for jwt token related functionalities
'''
from rest_framework_simplejwt.tokens import RefreshToken


def generate_access_token(user):
    '''
        Utility: takes a user object and returns a JWT token.
    '''
    access_token = RefreshToken.for_user(user)
    return access_token
