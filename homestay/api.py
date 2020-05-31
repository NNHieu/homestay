from .serializer import *
from .models import Homestay, q_homestay_contains_facilities
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from util.utils import Searcher
import re

page_size = 10


class HomestayViewset(viewsets.ModelViewSet):
    """
    Viewset for Homestay Model
    """

    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomestaySerializer

    def get_queryset(self):
        print(self.request)
        queryset = None
        query_params = self.request.query_params
        print(query_params)
        page = query_params.get('page')
        facilities = query_params.get('facilities')
        if page:
            try:
                page = int(page)
            except ValueError:
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


class FacilityListAPI(generics.ListAPIView):
    serializer_class = FacilitySerializer
    queryset = Facility.objects.all()


class SearchListAPI(generics.ListAPIView):
    serializer_class = HomestaySerializer

    def get_queryset(self):
        query_params = self.request.query_params
        try:
            lng = float(query_params.get('lng'))
            lat = float(query_params.get('lat'))
        except ValueError | KeyError:
            raise ParseError(detail="Invalid argument")
        results = Searcher.knn([lat, lng], 3)
        return [adr.homestay for adr in results]


class HomestayDetailAPI(generics.RetrieveAPIView):
    serializer_class = HomestayDetailSerializer

    def get_object(self):
        pk = self.kwargs['pk']
        print(pk)
        h = Homestay.objects.get(pk=pk)
        print(h)
        return h
