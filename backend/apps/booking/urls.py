from django.urls import path
from apps.booking import views

urlpatterns = [
    path('users/<str:firebase_user_id>/booking', views.booking_list),
    path('users/<str:firebase_user_id>/booking/<int:tpk_booking_id>/', views.booking_modify),
]
