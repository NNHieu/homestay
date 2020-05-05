from django.conf.urls import url
from django.urls import path

from . import views

# Nên để là account hay user?
app_name = 'account'
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
]