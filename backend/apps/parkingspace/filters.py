from django_filters import rest_framework as filters
from .models import ParkingSpace

class ParkingSpaceFilter(filters.FilterSet):
    class Meta:
        model = ParkingSpace
        fields = {
            'parking_area' : ['gte'],
            'has_features' : ['iexact'],
            'vehicle_capacity' : ['gte'],
            # 'name': ['icontains'],  // no field in model yet
            'address' : ['icontains'],
            'city' : ['iexact'],
            'country' : ['iexact'],
            'area_code' : ['iexact'],
            # lat : 43.46776431622622,
            # long : -80.53847208326658,
            'parking_features__has_car_charging' :['iexact'],
            'parking_features__has_car_wash' :['iexact'],
            'parking_features__has_indoor_parking' :['iexact'],
            'created_on' : ['iexact'],
            'last_booked' : ['iexact'],
            'is_booked' : ['iexact'],
        }