from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from . import views
from .api import UserViewSet, RegisterAPI, SignUpAPI, LoginAPI, UserAPI

# Nên để là account hay user?
app_name = 'account'

# router = routers.DefaultRouter()
# router.register('api', UserViewSet, 'api')

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/signup', SignUpAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/logoutall', knox_views.LogoutAllView.as_view(),
         name='knox_logoutall'),
]
# + router.urls
