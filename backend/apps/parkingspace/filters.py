from django_filters import rest_framework as filters
from .models import ParkingSpace

class ParkingSpaceFilter(filters.FilterSet):
    class Meta:
        model = ParkingSpace
        fields = {

            'tpk_parking_area' : ['gte'],
            'tpk_has_features' : ['iexact'],
            'tpk_vehicle_capacity' : ['gte'],
            'user__tpk_name': ['icontain'],
            # 'name': ['icontains'],  // no field in model yet
            'address' : ['icontains'],
            'city' : ['iexact'],
            'country' : ['iexact'],
            'area_code' : ['iexact'],
            # lat : 43.46776431622622,
            # long : -80.53847208326658,
            'tpk_parking_features__tpk_has_car_charging' :['iexact'],
            'tpk_parking_features__tpk_has_car_wash' :['iexact'],
            'tpk_parking_features__tpk_has_indoor_parking' :['iexact'],
            'tpk_created_on' : ['iexact'],
            'tpk_last_booked' : ['iexact'],
            'tpk_is_booked' : ['iexact'],
        }