from django.urls import path, include
from .views import *

urlpatterns = [
    path("register/", user_register, name='register'),
    path("login/", user_login, name='login'),
]