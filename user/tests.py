import os
import re

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.core import mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from user.tokens import account_activation_token


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='testuser@user.com', password='testpassword')
        self.assertEqual(user.email, 'testuser@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="testpassword")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('testsuper@user.com', 'password1234')
        self.assertEqual(admin_user.email, 'testsuper@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)


class TestVerifyEmail(TestCase):

    def test_SendMail(self):
        # Hộp thư rỗng
        self.assertEqual(len(mail.outbox), 0)
        # email và password đăng kí
        email = 'test@email.com'
        password = 'thisissecret'

        # Client
        c = Client()
        c.post('/account/signup/', {'email': email, 'password1': password, 'password2': password})

        # Client nhận được email yêu cầu xác thực tài khoản
        self.assertEqual(len(mail.outbox), 1)

        # Hệ thống tạo tài khoản chưa active cho user
        self.assertTrue(get_user_model().objects.filter(email=email).exists())
        user = get_user_model().objects.get(email=email)
        self.assertFalse(user.is_active)

        # Uid và token cho việc xác thực
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)

        # Email phải gửi đúng uid và token
        mail_body = mail.outbox[0].body
        matcher = re.search(r'http://testserver(/account/activate/(\w+)/(.+)/)', mail_body)
        self.assertEqual(matcher.group(2), uid)
        self.assertEqual(matcher.group(3), token)

        # Client truy cập đường link
        c.get(matcher.group(1))
        user = get_user_model().objects.get(email=email)

        # Tài khoản được kích hoạt
        self.assertTrue(user.is_active)
