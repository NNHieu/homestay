from django.conf.urls import url
from django.urls import path

from . import views

app_name = 'account'
urlpatterns = [
    # url(r'^$', views.home, name='home'),
    # path('', views.blank_view, name='blank'),
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    path('validate/', views.validate_ajax_answer, name='validate'),
    path('login/', views.login_view, name='login'),
    # url(r'^login/', views.login_view, name='login'),
    # url(r'^login/(?P<uidb64>[0-9A-Za-z_\-]+)/$',
    #     views.activate, name='login_uid'),
    path('logout/', views.logout_view, name='logout'),
    path('edit/', views.edit_profile, name='edit_profile'),
]