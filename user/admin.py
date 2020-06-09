from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, UserProfile


class UserProfileAdmin(admin.StackedInline):
    model = UserProfile
    max_num = 1


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active', 'is_verified', 'first_name', 'last_name')
    list_filter = ('email', 'is_staff', 'is_active', 'is_verified' )
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name')}),
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_verified')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    inlines = UserAdmin.inlines + [UserProfileAdmin, ]


admin.site.register(CustomUser, CustomUserAdmin)