from django.urls import path
from apps.parkingspace import views

urlpatterns = [
    path('parking', views.parkingspace_list),
    path('parking/<int:parkingspace_id>/', views.parkingspace_modify)
]
