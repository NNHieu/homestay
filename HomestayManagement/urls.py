from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

app_name = 'hm'
urlpatterns = [

    path('', views.BrowseView.as_view(), name='index'),
    path('upload/', views.upload_view, name='upload'),
    path('upload/success/', views.upload_success_view, name='upload_success'),
    path('my/', views.MyView.as_view(), name='my'),
    path('homestay/<int:pk>', views.HomestayView.as_view(), name='detail'),
    path('map/', views.map_view, name='map'),
]
