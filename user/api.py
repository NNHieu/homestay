from .models import CustomUser
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import *
from django.contrib.auth import get_user_model
from knox.models import AuthToken

from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text

from django.contrib.auth import login
# CustomUser Viewset

import logging

logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserAllInfoSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def list(self, request):
        return get_user_model().objects.all()


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserAllInfoSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class SignUpAPI(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Gen token và gửi email
        current_site = get_current_site(request)
        mail_subject = 'Activate your account.'
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verify_token = account_activation_token.make_token(user)
        message = render_to_string('user/acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': uid,
            'token': verify_token,
        })
        to_email = user.email
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        # email.send()

        return Response({
            "user": UserAllInfoSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "uid": uid,
            "verify_token": verify_token,
            "msg": message
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        logger.info('Receive request')
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            logger.exception(e)
            raise AuthenticationFailed(
                detail=e.get_full_details())
        user = serializer.validated_data
        # if AuthToken.objects.filter(user=user).exists():
        #     raise AuthenticationFailed(
        #         detail='Account has been login in. Please logout')
        login(request, user)
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# class LogoutAPI(generics.GenericAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     def post(self, request):
#         AuthToken.objects.filter(user=self.request.user).remove()

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    # def get(self, request):
    #     return Response({
    #         "user": self.get_serializer(request.user).data
    #     })

    def get_object(self):
        return self.request.user
