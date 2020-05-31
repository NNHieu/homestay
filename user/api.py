from .models import CustomUser
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, LoginSerializer, SignupSerializer
from django.contrib.auth import get_user_model
from knox.models import AuthToken
from django.contrib.auth import login
from rest_framework.serializers import ValidationError as SerialValidationError

import logging
from .utils.sign_up import get_uid_token_verify, get_verify_link, get_user_data, activate

logger = logging.getLogger(__name__)


class SignUpAPI(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        logger.debug('Receive request sign up\n Data: %s', request.data)
        # check_recaptcha(request)
        serializer = self.get_serializer(data=get_user_data(request))
        try:
            serializer.is_valid(raise_exception=True)
        except SerialValidationError as e:
            return Response({
                "success": False,
                "errors": e.detail
            })
        user = serializer.save()
        return Response({
            "success": True,
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "verify_link":  get_verify_link(request, user)
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        logger.debug('Receive request log in\n Data: %s', request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except SerialValidationError as e:
            return Response({
                "success": False,
                "errors": e.detail
            })
        user = serializer.validated_data
        # if AuthToken.objects.filter(user=user).exists():
        #     raise AuthenticationFailed(
        #         detail='Account has been login in. Please logout')
        # login(request, user)
        _, token = AuthToken.objects.create(user)
        login(request, user)
        return Response({
            "success": True,
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = UserSerializer

    # def get(self, request):
    #     return Response({
    #         "user": self.get_serializer(request.user).data
    #     })

    def get_object(self):
        return self.request.user


class ActivateAccountAPI(generics.GenericAPIView):
    def get(self, request):
        logger.info(request.data)
        code, user = activate(request)
        msg = 'success'
        success = True
        if code == -1 or code == -2:
            msg = 'Activation link is invalid!'
            success = False
        elif code == 1:
            msg = 'Account already acivated'
        else:
            user = UserSerializer(
                user, context=self.get_serializer_context()).data
        return Response({'success': success, "user": user if success else None, 'msg': msg})
