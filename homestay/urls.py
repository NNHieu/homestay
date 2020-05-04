from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from . import views

app_name = 'homestay'

view_patterns = [
    path('homestay/<int:pk>', views.HomestayView.as_view(), name='detail'),
]

urlpatterns = [

    path('', views.BrowseView.as_view(), name='index'),
    path('upload/', views.upload_view, name='upload'),
    path('upload/success/', views.upload_success_view, name='upload_success'),
    path('my/', views.MyView.as_view(), name='my'),
    path('search/', views.search, name='search'),
    path('test/search', views.test_search, name='test_search'),
    path('about/', views.about_view, name='about'),
    path('book/<int:hid>', views.booking, name='book'),
    path('test/', include(view_patterns)),

] + view_patterns 


