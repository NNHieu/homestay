from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(get_user_model(), verbose_name=_("Account"), on_delete=models.CASCADE)
    phone_number = PhoneNumberField(_("Phone number"))
    location = models.CharField(max_length=140)

    class Gender(models.IntegerChoices):
        MALE = 1
        FEMALE = 2
        OTHER = 3

    gender = models.IntegerField(choices=Gender.choices)
    profile_picture = models.ImageField(upload_to='images/account_profile', blank=True)

    def __unicode__(self):
        return u'Profile of user: %s' % self.user
