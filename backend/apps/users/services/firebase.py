import pyrebase
from django.conf import settings

def getUserProfileByToken(token):
    firebase = pyrebase.initialize_app(settings.FIREBASE)
    firebase_user = firebase.auth().get_account_info(token)
    return firebase_user
