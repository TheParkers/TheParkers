from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users_list),
    path('users/<str:pk>/', views.user_mod),
]