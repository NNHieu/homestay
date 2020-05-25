from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from . import views
from .api import UserViewSet, RegisterAPI, SignUpAPI, LoginAPI, UserAPI

# Nên để là account hay user?
app_name = 'account'

router = routers.DefaultRouter()
router.register('api', UserViewSet, 'api')

urlpatterns = [
    # Url sign up
    url(r'^signup/$', views.signup, name='signup'),
    # Url verify email dạng /activate/<user id>/<token>
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    # Url kiểm tra tên tài khoản với ajax
    path('validate/', views.validate_ajax_answer, name='validate'),
    # Url đăng nhập
    path('login/', views.login_view, name='login'),
    # Url đăng xuất
    path('logout/', views.logout_view, name='logout'),
    # Url sửa profile
    path('edit/', views.edit_profile, name='edit_profile'),

    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/signup', SignUpAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/logoutall', knox_views.LogoutAllView.as_view(),
         name='knox_logoutall'),
] + router.urls
