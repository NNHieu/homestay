from django.urls import path, re_path
from . import views

urlpatterns = [
    # re_path(r'^(?P<path>.*)$', views.index),
    path('', views.index),
    path('login/', views.index),
    path('signup/', views.index),
    path('auth/login', views.index),
    path('auth/signup', views.index),
    path('homestay/<int:pk>', views.detail),
    path('upload/', views.index),
]
