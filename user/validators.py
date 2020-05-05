import re

from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils.deconstruct import deconstructible
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


@deconstructible
class MyUsernameValidator(RegexValidator):
    regex = r'^[\w.@+-]{8,}$'
    message = _(
        'Enter a valid username. This value may contain only letters, '
        'numbers, and @/./+/-/_ characters, minimum 8 chars.'
    )
    flags = 0


# Không cần nữa vì có django-phonenumber-field
# class PhoneNumberValidator(RegexValidator):
#     regex = r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})'
#     # regex = r'^(\d{10})$'
#     message = _(
#         'Enter a valid phone number.'
#     )
#     flags = 0


def validate_email_syntax(email):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False


def validate_username_syntax(username):
    return re.search(MyUsernameValidator.regex, username) is not None


def validate_user_id(value, is_email):
    User = get_user_model()
    if is_email:
        if validate_email_syntax(value):
            return not User.objects.filter(email=value).exists()
    else:
        if validate_username_syntax(value):
            return not User.objects.filter(username=value).exists()
    return False
