from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path, include

from rest_framework import routers

from .api import *
from . import views

app_name = 'homestay'

view_patterns = [

]

router = routers.DefaultRouter()
router.register('api', HomestayViewset, 'homestay_api')

api_urls = [
    path('api/', include([
        path('facilities/list', FacilityListAPI.as_view()),
        path('search/', SearchListAPI.as_view()),
        path('detail/<int:pk>', HomestayDetailAPI.as_view())
    ]))
] + router.urls

urlpatterns = [
    # url trang chủ
    path('', views.BrowseView.as_view(), name='index'),
    # url đăng bài
    path('upload/', views.upload_view, name='upload'),
    # url đăng bài thành công
    path('upload/success/', views.upload_success_view, name='upload_success'),
    # url list các homestay của user
    path('my/', views.MyView.as_view(), name='my'),
    # url gửi request tìm kiếm
    path('search/', views.search, name='search'),
    # url thông tin homestay có primarykey=pk
    path('homestay/<int:pk>', views.HomestayView.as_view(), name='detail'),
    # đặt phòng
    path('book/<int:hid>', views.booking, name='book'),
    # url thông tin trang web
    path('about/', views.about_view, name='about'),
    # url rating
    path('rating/<int:contract_id>', views.rating, name='rating'),
] + api_urls
