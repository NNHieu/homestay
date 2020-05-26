from .serializer import *
from .models import Homestay, q_homestay_contains_facilities
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

import re

page_size = 3


class HomestayViewset(viewsets.ModelViewSet):
    """
    Viewset for Homestay Model
    """

    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomestaySerializer

    def get_queryset(self):
        queryset = None
        query_params = self.request.query_params
        print(query_params)
        page = query_params.get('page')
        facilities = query_params.get('facilities')
        if page:
            try:
                page = int(page)
            except ValueError as e:
                raise ParseError(detail='Invalid argument')
        else:
            page = 0
        if facilities:
            queryset = q_homestay_contains_facilities(facilities)
            if queryset is None:
                raise ParseError(detail='Invalid argument')
        if queryset is None:
            queryset = Homestay.objects.all()
        return queryset[page:min(page + page_size, len(queryset))]


class HomestayListAPI(generics.ListAPIView):
    serializer_class = HomestaySerializer

    def get_queryset(self):
        return Homestay.objects.all()[:3]


class FacilityListAPI(generics.ListAPIView):
    serializer_class = FacilitySerializer
    queryset = Facility.objects.all()
