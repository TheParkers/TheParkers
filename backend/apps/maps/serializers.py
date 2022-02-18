'''
    Serializer: user app
'''
from rest_framework import serializers
from .models import ParkerMap

class MapSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer: generic Parker Maps
    '''
    class Meta:
        model = ParkerMap
        fields = ['Lat_db', 'Long_db']
        app_label = 'apps.maps'
