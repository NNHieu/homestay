from django.contrib import admin

from .models import *


# Register your models here.
# Các quản lí dành cho admin
class HomestayAdmin(admin.ModelAdmin):
    readonly_fields = ['facilities']


admin.site.register(Homestay, HomestayAdmin)
admin.site.register(ReviewImage)
admin.site.register(Facility)
admin.site.register(Address)
admin.site.register(Contract)
