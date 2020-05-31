import os
import re

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.core import mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from homestay import views as hviews
from user.tokens import account_activation_token
from user.views import errors_list


def create_user_prog(email, password):
    """Test create normal account programmatically"""
    if password:
        return get_user_model().objects.create_user(email=email, password=password)
    else:
        return get_user_model().objects.create_user(email=email)


def post_signup_user_form(client, *args, **kwargs):
    return client.post('/account/signup/', kwargs)


def send_verify_link(client, verify_email):
    mail_body = verify_email.body
    matcher = re.search(r'http://testserver(/account/activate/(\w+)/(.+)/)', mail_body)
    # Client truy cập đường link
    client.get(matcher.group(1))


def create_user_website(client, email, first_name, last_name, password):
    len_mailbox_pre = len(mail.outbox)
    post_signup_user_form(client, email=email, first_name=first_name, last_name=last_name, password1=password,
                          password2=password)
    len_mailbox_post = len(mail.outbox)
    if len_mailbox_post - len_mailbox_pre == 1:
        send_verify_link(client, mail.outbox[-1])
        return get_user_model().objects.get(email=email)
    return None


def get_uid_token(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    return uid, token


def get_uid_token_email(email):
    mail_body = email.body
    matcher = re.search(r'http://testserver(/account/activate/(\w+)/(.+)/)', mail_body)
    return matcher.group(1), matcher.group(2), matcher.group(3)


class UserSignupTestsProgrammatically(TestCase):
    """Test signup account"""
    email1 = 'testuser01@email.com'
    pw1 = 'testpassword1'

    def test_create_users(self):
        user = create_user_prog(email=self.email1, password=self.pw1)
        self.assertEqual(user.email, self.email1)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass

    def create_no_password_user(self):
        user = create_user_prog(email=self.email1)
        self.assertEqual(user.email, self.email1)
        self.assertFalse(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass

    def test_create_none_email_user(self):
        with self.assertRaises(TypeError):
            create_user_prog(email=None, password=None)

    def test_create_blank_email_user(self):
        with self.assertRaises(TypeError):
            create_user_prog(email='', password=None)
        with self.assertRaises(ValueError):
            create_user_prog(email='', password="testpassword")

    # Copy từ https://testdriven.io/blog/django-custom-user-model/
    def test_create_superuser(self):
        """Test create super account programmatically"""
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


class UserSignupWebsite(TestCase):
    """Signup on Website"""
    c = Client()

    def test_signup_user_over_website(self):
        """Test create normal account over website"""
        c = self.c
        email = 'testuser01@email.com'
        password = 'Testpw01'
        first_name = 'FName'
        last_name = 'LName'

        len_mailbox_pre = len(mail.outbox)
        response = post_signup_user_form(c,
                              email=email,
                              first_name=first_name,
                              last_name=last_name,
                              password1=password,
                              password2=password)
        len_mailbox_post = len(mail.outbox)
        # Client nhận được email yêu cầu xác thực tài khoản
        self.assertEqual(len_mailbox_post - len_mailbox_pre, 1)

        # Hệ thống tạo tài khoản chưa active cho user
        self.assertTrue(get_user_model().objects.filter(email=email).exists())
        user = get_user_model().objects.get(email=email)
        self.assertFalse(user.is_active)

        # Uid và token cho việc xác thực
        uid, token = get_uid_token(user)

        # Email phải gửi đúng uid và token
        email_link, email_uid, email_token = get_uid_token_email(mail.outbox[-1])

        self.assertEqual(uid, email_uid)
        self.assertEqual(token, email_token)

        # Client truy cập đường link
        c.get(email_link)
        user = get_user_model().objects.get(email=email)

        # Tài khoản được kích hoạt
        self.assertTrue(user.is_active)

    def test_signup_noname_user(self):
        c = self.c
        email = 'email1'
        password = 'password'
        len_mailbox_pre = len(mail.outbox)
        response = post_signup_user_form(c, email=email, password1=password, password2=password)
        len_mailbox_post = len(mail.outbox)

        self.assertEqual(len_mailbox_pre, len_mailbox_post)


class LoginTest(TestCase):
    client = Client()
    email_prefix = 'testuser'
    not_verify_email_prefix = 'NotVerify'
    email_suffix = '@email.com'

    def setUp(self):
        for i in range(10):
            create_user_website(self.client,
                                self.email_prefix + f'{i}' + self.email_suffix,
                                str(i), "User", 'pass01@01')

        post_signup_user_form(self.client, email=f'{self.not_verify_email_prefix}1{self.email_suffix}',
                              first_name='Not', last_name='Verify',
                              password1='RightPassword01', password2='RightPassword01')

    def test_login_ok(self):
        for i in range(10):
            response = self.client.post('/account/login/', {'email': f'testuser{i}@email.com', 'password': 'pass01@01'})
            self.assertRedirects(response, '/')

    def test_login_not_exist(self):
        response = self.client.post('/account/login/', {'email': 'testuserNotExist@email.com', 'password': 'pass01@01'})
        self.assertEqual(response.context['errors'], errors_list[-1])

    def test_login_wrong_password(self):
        response = self.client.post('/account/login/', {'email': 'testuser1@email.com', 'password': 'thisiswrongpassword'})
        self.assertEqual(response.context['errors'], errors_list[-1])

    def test_login_not_verify(self):
        response = self.client.post('/account/login/', {'email': f'{self.not_verify_email_prefix}1{self.email_suffix}', 'password': 'RightPassword01'})
        self.assertEqual(response.context['errors'], errors_list[-2])
