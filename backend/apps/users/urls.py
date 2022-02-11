from django.urls import path
from apps.users import views

urlpatterns = [
    path('users/', views.users_list),
    path('users/<str:pk>/', views.user_mod),
    path('users/register/<str:pk>/', views.new_user),
]