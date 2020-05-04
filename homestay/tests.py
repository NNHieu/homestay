import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase, Client
# Create your tests here.
from numpy.random.mtrand import random_sample
from scipy import rand

from homestay.models import Homestay, Address, Contrast


def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def create_homestay():
    title = randomString()
    user = get_user_model()(email=randomString() + '@email.com')
    user.set_password(randomString())
    user.save()
    address = Address(lat=random.uniform(-90, 90), lng=random.uniform(-180, 180) * 360 - 180)
    address.save()
    h = Homestay(title=title, owner=user, address=address, light_breakfast=False, use_of_kitchen=False)
    h.save()
    return h;


class Booking(TestCase):
    def book(self, i, checkin, checkout):
        c = Client()
        return c.post('/book/' + str(i), {'checkin_date': checkin, 'checkout_date': checkout, 'first_name': 'Ha',
                                          'last_name': 'Hi', 'phone_number': '+12125558268',
                                          'email': randomString() + '@email.com', 'hid': i})

    def test1(self):
        h = create_homestay()
        c = Client()
        c.post('/book/1', {'checkin_date': '2020-05-20', 'checkout_date': '2020-05-24', 'first_name': 'Ha',
                           'last_name': 'Hi', 'phone_number': '+12125558268', 'email': 'test@email.com', 'hid': 1})
        self.assertTrue(Contrast.objects.filter(homestay=h, checkin_date='2020-05-20', checkout_date='2020-05-24',
                                                guest__email='test@email.com').exists())

    def test2(self):
        for i in range(10):
            create_homestay()
        self.book(1, '2020-05-20', '2020-05-24')
        response = self.book(1, '2020-05-20', '2020-05-23')
        self.assertTrue('<form' in str(response.content))
        response = self.book(2, '2020-05-20', '2020-05-24')
        self.assertFalse('<form' in str(response.content))
        response = self.book(2, '2020-05-25', '2020-05-26')
        self.assertFalse('<form' in str(response.content))
        response = self.book(3, '2020-05-20', '2020-05-19')
        self.assertTrue('<form' in str(response.content))
        response = self.book(4, '2020-05-25', '2020-05-25')
        self.assertTrue('<form' in str(response.content))

    def test3(self):
        for i in range(10):
            create_homestay()
        response = self.book(2, '2020-05-20', '2020-05-24')
        self.assertFalse('<form' in str(response.content))
        response = self.book(2, '2020-05-24', '2020-05-25')
        self.assertTrue('<form' in str(response.content))
        response = self.book(2, '2020-05-18', '2020-05-20')
        self.assertTrue('<form' in str(response.content))
