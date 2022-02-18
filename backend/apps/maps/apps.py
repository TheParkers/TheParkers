'''
default django utility for app name register
'''
from django.apps import AppConfig


class MapTestConfig(AppConfig):
    '''
        register definition
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.maps'
