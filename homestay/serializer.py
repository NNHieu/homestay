from rest_framework import serializers
from .models import Homestay, ReviewImage, Facility


class HomestaySerializer(serializers.ModelSerializer):
    review_image = serializers.SerializerMethodField()

    class Meta:
        model = Homestay
        fields = ('id', 'title', 'description', 'review_image', 'facilities')

    def get_review_image(self, homestay):
        review_image = ReviewImage.objects.filter(
            homestay=homestay)[0].image.url
        return review_image


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('id', 'name', 'is_area_facility', 'is_character')
