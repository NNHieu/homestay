from .serializer import *
from .models import Homestay
from rest_framework import generics, viewsets, permissions


class HomestayViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomestaySerializer

    queryset = Homestay.objects.all()
