from django import forms

from .models import *


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
