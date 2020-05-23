from .models import CustomUser
from rest_framework import viewsets, permissions
from .serializers import CustomUserSerializer
from django.contrib.auth import get_user_model

# CustomUser Viewset


class UserListCreate(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_class = [
        permissions.IsAuthenticated,
    ]

    def create(self, request):
        print(request.POST)
        pass
