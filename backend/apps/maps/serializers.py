'''
    Serializer: user app
'''
from .models import ParkerMap
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class MapSerializer(GeoFeatureModelSerializer):
    '''
    Serializer: generic Parker Maps
    '''
    class Meta:
        model = ParkerMap
        geo_field = 'location'
        fields = '__all__'
        app_label = 'apps.maps'