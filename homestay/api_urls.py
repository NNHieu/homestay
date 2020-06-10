from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers


from . import views
from .api import UploadHomestayAPI

# Nên để là account hay user?
app_name = 'homestay'
urlpatterns = [
    path('upload/', UploadHomestayAPI.as_view())
]
