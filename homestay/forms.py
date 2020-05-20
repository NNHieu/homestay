from django import forms

from .models import *
from util.utils import OverlapDateChecker


# Form upload homestay
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
		
class AddressForm(forms.ModelForm):
	class Meta:
		model = Address
		fields = ('lat', 'lng')

# Form upload ảnh review
class ReviewImageForm(forms.ModelForm):
    image = forms.ImageField(label='Image')

    class Meta:
        model = ReviewImage
        fields = ('image',)


class BookingForm(forms.ModelForm):
    hid = forms.IntegerField(widget=forms.HiddenInput)

    class Meta:
        model = Contract
        # fields = ()
        fields = ("checkin_date", "checkout_date")

    def clean(self):
        super().clean()
        hid = self.cleaned_data.get('hid')
        try:
            checkin = self.cleaned_data.get('checkin_date')
            checkout = self.cleaned_data.get('checkout_date')
            # Kiểm tra ngày check out sau check in 1 ngày
            if checkin >= checkout:
                self.add_error('checkin_date', 'checkout - checkin >= 1 ')
            homestay = Homestay.objects.get(pk=hid)
            # Kiểm tra trùng lặp
            if OverlapDateChecker.check_available(homestay, checkin, checkout):
                self.add_error('checkin_date', 'Overlap')
                self.add_error('checkout_date', 'Overlap')

        except Homestay.DoesNotExist:
            self.add_error('hid', 'Invalid hid')


# Form nhập thông tin khách đặt phòng
class BookingGuestInfoForm(forms.ModelForm):
    class Meta:
        model = GuestInfo
        fields = ('email', 'first_name', 'last_name', 'phone_number')


class RatingForm(forms.ModelForm):
    # feedback = forms.CharField(widget=forms.TextInput)
    class Meta:
        model = Rating
        fields = ('overall', 'facility', 'comfort',  'valueformoney', 'location', 'cleanliness', 'feedback')
