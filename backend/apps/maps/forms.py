from django import forms
from maps.models import GCoordList
from django.utils.translation import gettext_lazy as _

class LatLong(forms.ModelForm):
    class Meta:
        model = GCoordList
        fields = ('Lat_db', 'Long_db')
        labels = {
            'Lat_db' : _('Lattitude'),
            'Long_db' : _('Longitude'),
        }

# class LatLong(forms.Form):
#     Lat = forms.DecimalField()
#     Long = forms.DecimalField()