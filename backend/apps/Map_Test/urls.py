from django.urls import URLPattern, path
from . import views

app_name = "Map_Test"

urlpatterns = [
    path('map/', views.LatLongList),
    path('map/<int:pk>/', views.LatLongMod),
]