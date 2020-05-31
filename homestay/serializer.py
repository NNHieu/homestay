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


class HomestayDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = Homestay
        fields = ('id', 'title', 'welcomes', 'description', 'facilities', 'light_breakfast',
                  'use_of_kitchen', 'rules',
                  'images',
                  'address')

    def get_images(self, homestay):
        images = map(
            lambda rimg: {"url": rimg.image.url, "title": rimg.title},
            ReviewImage.objects.filter(
                homestay=homestay
            )
        )
        return images

    def get_address(self, homestay):
        address_model = homestay.address
        return {"lat": address_model.lat, "lng": address_model.lng,
                "text": address_model.address,
                "about": address_model.about_area
                }


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('id', 'name', 'is_area_facility', 'is_character')
