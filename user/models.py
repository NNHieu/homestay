from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


# Custom User với email làm trường chính
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# Hồ sơ của user.
# Cần lưu gì với mỗi user?
class UserProfile(models.Model):
    # Foreign key
    user = models.OneToOneField(get_user_model(), verbose_name=_("Account"), on_delete=models.CASCADE)
    # SĐT
    phone_number = PhoneNumberField(_("Phone number"))
    # Địa chỉ. Giờ mới chỉ là VAR CHAR cho đơn giản dể test.
    location = models.CharField(max_length=140)

    # Các lựa chọn cho giới tính
    class Gender(models.IntegerChoices):
        MALE = 1
        FEMALE = 2
        OTHER = 3
        UNKNOWN = -1
    gender = models.IntegerField(choices=Gender.choices)
    # Ảnh hồ sơ
    profile_picture = models.ImageField(upload_to='images/account_profile', blank=True)

    def __unicode__(self):
        return u'Profile of user: %s' % self.user
