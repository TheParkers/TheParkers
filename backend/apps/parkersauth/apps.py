'''
default django utility for app name register
'''
from django.apps import AppConfig


class ParkersauthConfig(AppConfig):
    '''
        register definition
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'parkersauth'
