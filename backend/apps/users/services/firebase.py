import pyrebase
from django.conf import settings

def getUserProfileByToken(token):
    return pyrebase.initialize_app(settings.FIREBASE).auth().get_account_info(token)
