'''
Urls: django app
'''
from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.sign_in),
    path('signin/user', views.getSignedUser),
]
