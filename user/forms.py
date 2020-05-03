from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from .models import CustomUser, UserProfile


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email',)


class CustomUserLoginForm(forms.Form):

    email = forms.EmailField()
    password = forms.CharField(max_length=32, widget=forms.PasswordInput)


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = (
                 'first_name',
                 'last_name'
                )
class ProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('location' , 'phone_number', 'gender', 'profile_picture')