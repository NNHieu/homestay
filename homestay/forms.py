from django import forms
from django.utils.translation import gettext_lazy as _
from phonenumber_field.formfields import PhoneNumberField
from .models import *

from address.utils import OverlapDateChecker


class HomestayForm(forms.ModelForm):
    welcomes = forms.MultipleChoiceField(
        choices=((Homestay.Welcome[name].value, Homestay.Welcome[name].label) for name in Homestay.Welcome.names))
    homestay_facilities = forms.MultipleChoiceField(
        choices=((f.pk, f.name) for f in Facility.objects.filter(is_area_facility=False, is_character=False)))
    area_facilities = forms.MultipleChoiceField(
        choices=((f.pk, f.name) for f in Facility.objects.filter(is_area_facility=True, is_character=False)))

    class Meta:
        model = Homestay
        fields = ['title', 'description', 'light_breakfast', 'use_of_kitchen', 'rules']


class ReviewImageForm(forms.ModelForm):
    image = forms.ImageField(label='Image')

    class Meta:
        model = ReviewImage
        fields = ('image',)


class BookingForm(forms.ModelForm):
    hid = forms.IntegerField(widget=forms.HiddenInput)

    class Meta:
        model = Contrast
        # fields = ()
        fields = ("checkin_date", "checkout_date")

    def clean(self):
        super().clean()
        hid = self.cleaned_data.get('hid')
        try:

            checkin = self.cleaned_data.get('checkin_date')
            checkout = self.cleaned_data.get('checkout_date')
            if checkin >= checkout:
                self.add_error('checkin_date', 'checkout - checkin >= 1 ')
            homestay = Homestay.objects.get(pk=hid)
            if OverlapDateChecker.check_available(homestay, checkin, checkout):
                self.add_error('checkin_date', 'Overlap')
                self.add_error('checkout_date', 'Overlap')

        except Homestay.DoesNotExist:
            self.add_error('hid', 'Invalid hid')

class BookingGuestInfoForm(forms.ModelForm):
    # first_name = forms.CharField(label=_("First name"), max_length=50, required=True)
    # last_name = forms.CharField(label=_("Last name"), max_length=50, required=True)
    # email = forms.EmailField(label=_("Email"), required=True)
    # phone_number = PhoneNumberField(widget=forms.TextInput(attrs={'placeholder': _('Phone')}),
    #                                 label=_("Phone number"), required=True)
    class Meta:
        model = GuestInfo
        fields = ('email', 'first_name', 'last_name', 'phone_number')
