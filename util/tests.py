import datetime

from django.forms import DateField
from django.test import TestCase
from django.utils import timezone
from intervaltree import Interval, IntervalTree

from util.utils import Searcher, dist


# Create your tests here.
from homestay.models import Address


class TestDistance(TestCase):
    def test1(self):
        point1 = [20.619810, 106.209887]
        point2 = [20.615070, 106.195253]
        d = 1630
        self.assertAlmostEqual(d, dist(point1, point2), delta=10)

    def test2(self):
        point1 =  [20.619810, 106.209887]
        ipoints = [[20.615070, 106.195253],
                    [20.618070, 106.205253],
                    [20.619810, 106.209887]]

        opoints = [[20.619810, 108.209887],
                    [22.619810, 109.209887]]

        for p in ipoints:
            Address(lat=p[0], lng=p[1]).save()
        for p in opoints:
            Address(lat=p[0], lng=p[1]).save()

        s = Searcher()
        print(s.knn(point1, 3))
        self.assertEqual(len(s.search(point1, 1650)), len(ipoints))

    def test3(self):
        d = DateField()
        d1 = timezone.now()
        d2 = d1 + datetime.timedelta(days=1)
        d3 = d1 + datetime.timedelta(days=2)
        d4 = d1 + datetime.timedelta(days=4)
        tree = IntervalTree([Interval(d1, d3, None), Interval(d2, d4, None)])
        print(tree.overlap(d1, d2))
