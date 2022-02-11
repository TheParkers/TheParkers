from dataclasses import fields
from rest_framework import serializers
from Map_Test.models import GCoordList

class MapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GCoordList
        fields = ['Lat_db', 'Long_db']
        app_label = 'Map_Test'