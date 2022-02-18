'''
Service: Parker firebase service,
Type: third party
'''
import pyrebase
from django.conf import settings

def get_user_profile_bytoken(token):
    '''
        Service: Parker firebase service
        payload: {
                token: firebase token
            }
        action: initialize firebase app and get account info of logged in user
    '''
    return pyrebase.initialize_app(settings.FIREBASE).auth().get_account_info(token)
