from django.urls import path
from apps.maps import views

app_name = "Map_Test"

urlpatterns = [
    path('map/', views.LatLongList),
    path('map/<int:pk>/', views.LatLongMod),
]