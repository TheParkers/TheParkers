'''
Urls: django app
'''
from django.urls import path
from apps.maps import views

app_name = "Map_Test"

urlpatterns = [
    path('map', views.get_all_maps),
    path('map/<int:parker_map_id>/', views.mod_maps),
]
