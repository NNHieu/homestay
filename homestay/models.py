from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

import util.utils as utils


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
    light_breakfast = models.BooleanField(_('Complimentary Light Breakfast'))
    use_of_kitchen = models.BooleanField(_('Use of Kitchen'))
    #
    rules = models.TextField(_('House rules'), max_length=1000)
    #
    address = models.OneToOneField('Address', on_delete=models.CASCADE)
    # Thông tin đánh giá:
    score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(10)], null=True)

    def __str__(self):
        return self.title

    # def save(self, *args, **kwargs):
    #     ''' On save, update timestamps '''
    #     if not self.id:
    #         self.created = timezone.now()
    #     self.modified = timezone.now()


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
    title = models.CharField(max_length=50, blank=True)
    homestay = models.ForeignKey(Homestay, on_delete=models.CASCADE)
    first_save = models.DateTimeField(null=True, auto_now_add=True)


class GuestInfo(models.Model):
    user = models.ForeignKey(get_user_model(), verbose_name=_('User'), null=True, on_delete=models.SET_NULL)
    email = models.EmailField(_("Email"), max_length=254)
    first_name = models.CharField(_("First name"), max_length=50)
    last_name = models.CharField(_("Last name"), max_length=50)
    phone_number = PhoneNumberField(_("Phone number"))


class Contract(models.Model):
    homestay = models.ForeignKey("Homestay", verbose_name=_("Homestay"), on_delete=models.CASCADE)
    guest = models.ForeignKey(GuestInfo, verbose_name=_("Guest"), on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), verbose_name=_("User"), null=True, on_delete=models.SET_NULL)
    create_date = models.DateTimeField(_("Create date"), auto_now=True, auto_now_add=False)
    checkin_date = models.DateField(_("Check in"))
    checkout_date = models.DateField(_("Check out"))

    class State(models.IntegerChoices):
        NEW = 1, _('Just create')
        CONFIRMED = 2, _('confirmed/deposited')
        OPERATIONAL = 3
        COMPLETED = 0

        CANCELED_BEFORE_CONFIRM = -1
        CANCELED_AFTER_CONFIRM = -2
        NOSHOW = -3

    state = models.SmallIntegerField(_("state"), choices=State.choices)

    def save(self, *args, **kwargs):
        super().save(args, kwargs)
        utils.OverlapDateChecker.add(self)
