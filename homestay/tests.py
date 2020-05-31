import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase, Client
# Create your tests here.

from homestay.models import Homestay, Address, Contract


# Sinh random string
def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


# Tạo Homestay để test
def create_homestay():
    title = randomString()
    user = get_user_model()(email=randomString() + '@email.com')
    user.set_password(randomString())
    user.save()
    address = Address(lat=random.uniform(-90, 90), lng=random.uniform(-180, 180) * 360 - 180)
    address.save()
    h = Homestay(title=title, owner=user, address=address, light_breakfast=False, use_of_kitchen=False)
    h.save()
    return h


# test case đặt phòng
class Booking(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Tạo 10 homestay
        for i in range(10):
            create_homestay()

    def setUp(self):
        self.c = Client()

    # Hàm đặt phòng pk=i
    def book(self, home_id, checkin, checkout, email=None, phone_number='+12125558268', first_name='Ha', last_name='Hi'):
        if not email:
            email = randomString() + '@email.com'
        return self.c.post('/book/' + str(home_id), {
            'checkin_date': checkin, 'checkout_date': checkout,
            'first_name': first_name, 'last_name': last_name,
            'phone_number': phone_number, 'email': email,
            'hid': home_id})

    def test1(self):
        self.book(1, '2020-05-20', '2020-05-24', email='test@email.com')
        self.assertTrue(Contract.objects.filter(homestay=Homestay.objects.get(pk=1),
                                                checkin_date='2020-05-20', checkout_date='2020-05-24',
                                                guest__email='test@email.com').exists())

    def test2(self):
        self.book(1, '2020-05-20', '2020-05-24')
        response = self.book(1, '2020-05-20', '2020-05-23')
        # Kiểm tra yêu cầu chọn ngày khác vì bị trùng
        # Cần viết điều kiện rõ ràng hơn, ở đây chỉ check nếu response content có tag <form>
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
        response = self.book(2, '2020-05-20', '2020-05-24')
        self.assertFalse('<form' in str(response.content))
        response = self.book(2, '2020-05-24', '2020-05-25')
        self.assertTrue('<form' in str(response.content))
        response = self.book(2, '2020-05-18', '2020-05-20')
        self.assertTrue('<form' in str(response.content))
