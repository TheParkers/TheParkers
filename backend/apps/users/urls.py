'''
Urls: django app
'''
from django.urls import path
from apps.users import views

urlpatterns = [
    path('users', views.users_list),
    path('users/<str:firebase_user_id>', views.user_mod),
    path('users/register/<str:firebase_user_id>', views.new_user),
    path('permissions', views.permissions_list),
    path('roles', views.roles_list),
]
