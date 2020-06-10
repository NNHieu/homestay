from rest_framework import serializers
from .models import Homestay, HCImage, Facility, Address
import logging

logger = logging.getLogger(__name__)


class HomestayGeneralSerializer(serializers.ModelSerializer):
    review_image = serializers.SerializerMethodField()

    class Meta:
        model = Homestay
        fields = ('id', 'title', 'description', 'review_image', 'facilities')

    def get_review_image(self, homestay):
        review_image = HCImage.objects.filter(
            homestay=homestay)[0].image.url
        return review_image


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address


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
            lambda cimg: {"pid": cimg.public_id, "title": cimg.title},
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


class HomestayCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Homestay
        fields = ('id', 'homestay_type', 'area', 'capacity', 'bathroom',
                  'bedroom', 'title', 'general_description', 'owner')

    def validate_homestay_type(self, value):
        if not isinstance(value, int) or value < 1 or value > 4:
            raise serializers.ValidationError('Invalid homestay type')
        return value

    def create(self, validated_data):
        h = Homestay(**validated_data)
        logger.info(validated_data)
        logger.info(h)
        h.save()
        for i in validated_data['images']:
            img = HCImage(public_id=i, homestay=h)
            img.save()
        logger.info(Homestay.objects.all())
        return h


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('id', 'name', 'is_area_facility', 'is_character')
