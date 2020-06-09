import os
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

# CustomUser Serializer
import logging
logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'is_verified')

# Register Serializer

# Chỉ sử dụng trong quá trình dev


class SignupSerializer(serializers.ModelSerializer):
    '''Register 1 Account không cần verify email (DEV ONLY)'''
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_first_name(self, value):
        if value == '':
            raise serializers.ValidationError('First name is blank')
        return value

    def validate_last_name(self, value):
        if value == '':
            raise serializers.ValidationError('Last name is blank')
        return value

    def validate(self, data):
        errors = {}
        if data.get('first_name') is None:
            errors['first_name'] = ['First name is none']
        if data.get('last_name') is None:
            errors['last_name'] = ['Last name is none']
        if data.get('email') is None:
            errors['email'] = ['Email is none']
        if data.get('password') is None:
            errors['password'] = ['Password name is none']
        elif not errors:
            user = get_user_model().objects.create_user(commit=False, **data)
            try:
                validate_password(data['password'], user=user)
            except ValidationError as e:
                errors['password'] = e.messages
        if errors:
            raise serializers.ValidationError(errors)
        return data

    def create(self, validated_data):
        logger.debug('create user with data: %s', str(validated_data))
        user = get_user_model().objects.create_user(**validated_data)
        # user.is_active = False  # Chưa cho tài khoản này được sử dụng
        user.is_verified = False
        user.save()
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate_email(self, value):
        """
        Check email is valid
        """
        email = value
        logger.debug('validate email: %s', email)
        if email is None:
            raise serializers.ValidationError("Email data is none")
        elif email == '':
            raise serializers.ValidationError("Email field is empty")
        else:
            if not get_user_model().objects.filter(email=email).exists():
                raise serializers.ValidationError(
                    "User with the email isn't exist")
        return value

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError(
            {"password": "Authentication Fail"}, code=401)
