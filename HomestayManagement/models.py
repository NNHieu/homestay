from enum import Enum

from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
def validator_welcome_value(value):
    if value > 31:
        raise ValidationError(
            _('%(value)s is not an valid number for Welcomes Field'),
            params={'value': value}
        )

# Model cho Homestay
class Homestay(models.Model):
    # owner = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=35)
    description = models.TextField(max_length=1000)

    class Welcome(models.IntegerChoices):
        MALES = 1, _('Males')
        FEMALES = 1 << 1, _('Females')
        COUPLES = 1 << 2, _('Couples')
        FAMILIES = 1 << 3, _('Families')
        STUDENTS = 1 << 4, _('Students')

        # ALL = 0b11111, _('All')
        @property
        def ALL(self):
            return 0b11111

    welcomes = models.PositiveSmallIntegerField(validators=[validator_welcome_value], default=31)

    # # SET_NULL vì có thể thay ảnh, hệ thông phải xủ lí
    # main_image = models.PositiveIntegerField(null=True)
    #
    # id dùng cho crawl
    homestay_dot_com_id = models.PositiveIntegerField(unique=True, null=True)

    facilities = models.ManyToManyField('Facility', symmetrical=False)

    #
    # Meals
    light_breakfast = models.BooleanField('Complimentary Light Breakfast')
    use_of_kitchen = models.BooleanField('Use of Kitchen')
    #
    rules = models.TextField('House rules', max_length=1000)
    #
    address = models.OneToOneField('Address', on_delete=models.CASCADE)
    # Thông tin đánh giá:
    score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True)

    def __str__(self):
        return self.title


# class Room(models.Model):
#     name = models.CharField(max_length=50)
#     num_guests = models.PositiveSmallIntegerField()
#     num_single_beds = models.PositiveSmallIntegerField()
#     num_double_beds = models.PositiveSmallIntegerField()
#     price_per_night = models.FloatField()
#     currency = models.CharField(max_length=4)
#     homestay_id = models.ForeignKey('Homestay', on_delete=models.CASCADE)
#     images = models.ManyToManyField('ReviewImage', symmetrical=False)
#
#

# Model lưu thông tin địa chỉ
class Address(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    about_area = models.TextField(max_length=1000)
    address = models.CharField(blank=True, max_length=200)

    def __str__(self):
        return f'{self.lat}, {self.lng}'

    class Meta:
        unique_together = ('lat', 'lng',)


# Model về các tiện ích
class Facility(models.Model):
    name = models.CharField(max_length=20, unique=True)
    is_area_facility = models.BooleanField(default=False)  # Thuộc về khu vực
    is_character = models.BooleanField(default=False)  # Thuộc về người

    def __str__(self):
        return self.name


# Model về các ảnh review
class ReviewImage(models.Model):
    image = models.ImageField(unique=True, upload_to='image/mysite/')
    homestay = models.ForeignKey(Homestay, on_delete=models.CASCADE)
