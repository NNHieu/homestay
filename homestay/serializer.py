from rest_framework import serializers
from .models import Homestay, ReviewImage


class HomestaySerializer(serializers.ModelSerializer):
    review_image = serializers.SerializerMethodField()

    class Meta:
        model = Homestay
        fields = ('id', 'title', 'review_image')

    def get_review_image(self, homestay):
        review_image = ReviewImage.objects.filter(
            homestay=homestay)[0].image.url
        return review_image
