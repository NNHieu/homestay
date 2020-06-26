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

import json
import logging

logger = logging.getLogger(__name__)


URL_API_LOGIN = '/api/auth/login'
URL_API_LOGOUT = '/api/auth/logout'
URL_API_SIGNUP = '/api/auth/signup'
URL_API_USER = '/api/auth/user'


# Errors
NON_EXIT_EMAIL_MSG = ["User with the email isn't exist"]


class TestAuth(TestCase):
    signup_accounts = [
        {"firstName": "Test", "lastName": "User",
            "email": "testuser001@email.com", "password": "qwer1234!", "verify": True},

        {"firstName": "Test", "lastName": "User",
         "email": "testuser002@email.com", "password": "qwer1234!",  "verify": False},

        {"firstName": "Test", "lastName": "User",
         "email": "testuser003@email.com", "password": "qwer1234!",  "verify": False}
    ]

    invalid_signup_accounts = [
        # Dang ky tai khoan voi email da ton tai
        {"firstName": "Test", "lastName": "User",
            "email": "testuser001@email.com", "password": "qwer1234!",
            "errors": {
                'email': ['user with this Email address already exists.']
            }},

        # De trong first name, last name
        {"firstName": "", "lastName": "",
         "email": "testuser_e002@email.com", "password": "testuser122",
         "errors": {
             "first_name": ["First name is blank"],
             "last_name": ["Last name is blank"]
         }
         },

        # Password yeu (it hon 8 ki tu)
        {"firstName": "TestUser", "lastName": "A",
            "email": "testuser_e002@email.com", "password": "wqreqw",
            "errors": {"password": ["This password is too short. It must contain at least 8 characters."]}
         },
    ]

    invalid_accounts = [
        # Tai khoan khong ton tai
        {"firstName": "Test", "lastName": "NonUser",
            "email": "testnonuser001@email.com", "password": "qwer1234!",
            "errors": {
                "email":  ["User with the email isn't exist"]
            }},

        # De trong truong password
        {"firstName": "Test", "lastName": "User",
            "email": "testuser001@email.com", "password": "",
            "errors": {
                "password": [
                    "This field may not be blank."
                ]
            }},

        # De trong truong email
        {"firstName": "Test", "lastName": "User",
            "email": "", "password": "fasfw",
            "errors": {
                "email": [
                    "This field may not be blank."
                ]
            }},

        # Nhap sai password
        {"firstName": "Test", "lastName": "User",
            "email": "testuser001@email.com", "password": "asdfqwer",
            "errors": {
                "password": [
                    "Authentication Fail"
                ]
            }},
    ]

    verify_links = []
    invalid_verify_links = [
        {"link": "http://localhost:8000/api/auth/activate?uid=Ng&token=5ho-2dad55d0df76d236ca9c",
            "msg":  "Activation link is invalid!"}
    ]
    tokens = []
    invalid_tokens = [
        {'token': 'asd544w6q4r321321r3qw2erw'}
    ]

    client = Client()

    def login(self, account):
        return self.client.post(URL_API_LOGIN, account)

    def logout(self, token):
        token = "Token " + token
        headers = {"HTTP_AUTHORIZATION": token}
        return self.client.post(URL_API_LOGOUT, **headers)

    def sign_up(self, account):
        return self.client.post(URL_API_SIGNUP, account)

    def get_user(self, token):
        logger.info('token %s', token)
        token = "Token " + token
        headers = {"HTTP_AUTHORIZATION": token}
        return self.client.get(URL_API_USER, **headers)

    def assert_account(self, exp_acc, account, activation=None):
        self.assertEqual(exp_acc['email'], account['email'])
        self.assertEqual(exp_acc['first_name'], account['firstName'])
        self.assertEqual(exp_acc['last_name'], account['lastName'])
        self.assertEqual(exp_acc['is_verified'],
                         account['verify'] if activation is None else activation)

    def assert_login_ok(self, response, account, activation=None):
        self.assertTrue(response['success'])
        self.assert_account(response['user'], account, activation)
        self.tokens.append({
            "token":  response['token'],
            "account": account
        })

    def assert_login_non_exists(self, response, account):
        self.assertFalse(response['success'])
        self.assertEqual(response['errors']['email'], NON_EXIT_EMAIL_MSG)

    def assert_error(self, response, account):
        self.assertFalse(response['success'])
        self.assertEqual(response['errors'], account['errors'])

    def assert_activation_ok(self, response, link):
        self.assertTrue(response['success'])
        self.assertEqual(response['user']['email'], link["account"]['email'])
        self.assertEqual(response['user']['first_name'],
                         link["account"]['firstName'])
        self.assertEqual(response['user']['last_name'],
                         link["account"]['lastName'])
        self.assertTrue(response['user']['is_verified'])
        self.assertEqual(response['msg'], 'success')

    def assert_activation_error(self, response, link):
        self.assertFalse(response['success'])
        self.assertEqual(response['msg'], link['msg'])

    def assert_sign_up_ok(self, response, account):
        self.assert_login_ok(response, account, False)
        self.assertIn('verify_link', response.keys())

    def assert_login_token(self, response, token):
        self.assert_account(response, token["account"])

    def assert_login_token_fail(self, response, token):
        self.assertEqual(response['detail'], "Invalid token.")

    def t_login(self, accounts, assert_func):
        for acc in accounts:
            response = self.login(acc).content
            response = json.loads(response)
            assert_func(response, acc)

    def t_sign_up(self, accounts, assert_func):
        for acc in accounts:
            response = self.sign_up(acc).content
            response = json.loads(response)
            if 'verify' in acc.keys() and acc['verify']:
                self.verify_links.append(
                    {"link": response["verify_link"], "account": acc})
                self.invalid_verify_links.append(
                    {"link": response["verify_link"], "msg": "Account already acivated"})
            assert_func(response, acc)

    def t_activate(self, verify_links, assert_func):
        for l in verify_links:
            response = json.loads(self.client.get(l['link']).content)
            assert_func(response, l)

    def t_get_user(self, tokens, assert_func):
        for t in tokens:
            response = self.get_user(t['token']).content
            response = json.loads(response)
            logger.info(response)
            assert_func(response, t)

    def t_logout(self, tokens):
        self.t_get_user(tokens, self.assert_login_token)
        for t in tokens:
            self.logout(t['token'])
        self.t_get_user(tokens, self.assert_login_token_fail)

    def test(self):
        self.t_sign_up(self.signup_accounts, self.assert_sign_up_ok)
        self.t_sign_up(self.invalid_signup_accounts, self.assert_error)

        self.t_activate(self.verify_links, self.assert_activation_ok)
        self.t_activate(self.invalid_verify_links,
                        self.assert_activation_error)

        self.t_login(self.signup_accounts, self.assert_login_ok)
        self.t_login(self.invalid_accounts, self.assert_error)

        self.t_get_user(self.tokens, self.assert_login_token)
        self.t_get_user(self.invalid_tokens, self.assert_login_token_fail)

        self.t_logout(self.tokens)
