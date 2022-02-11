from dataclasses import fields
from rest_framework import serializers
from maps.models import GCoordList

class MapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GCoordList
        fields = ['Lat_db', 'Long_db']
        app_label = 'maps'