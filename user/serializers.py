from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model

from django.contrib.auth import authenticate
# CustomUser Serializer


class UserAllInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email')

# Register Serializer

# Chỉ sử dụng trong quá trình dev


class RegisterSerializer(serializers.ModelSerializer):
    '''Register 1 Account không cần verify email (DEV ONLY)'''
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        user.save()
        return user


class SignupSerializer(serializers.ModelSerializer):
    '''Register 1 Account không cần verify email (DEV ONLY)'''
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Save user object nhưng không đẩy lên database

        user = get_user_model().objects.create_user(**validated_data)
        user.is_active = False  # Chưa cho tài khoản này được sử dụng
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
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid")
