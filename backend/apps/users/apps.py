'''
default django utility for app name register
'''
from django.apps import AppConfig

class UsersConfig(AppConfig):
    '''
        register definition
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users'