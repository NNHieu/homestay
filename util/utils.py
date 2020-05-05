import datetime

import numpy
import kdtree
import homestay.models as hmodels
from math import acos, cos, sin, radians
from geopy.distance import distance
from intervaltree import Interval, IntervalTree

class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


# This class emulates a tuple, but contains a useful payload
class Item(object):
    def __init__(self, x, y, data):
        self.coords = (x, y)
        self.data = data

    def __len__(self):
        return len(self.coords)

    def __getitem__(self, i):
        return self.coords[i]

    def __repr__(self):
        return 'Item({}, {}, {})'.format(self.coords[0], self.coords[1], self.data)


def dist(p1, p2):
    return distance(p1, p2).m


class Searcher(metaclass=Singleton):
    kdtree = None
    _instance = None

    def __call__(self):
        self.setup()

    @classmethod
    def setup(cls):
        print('sSearcher etting up')
        cls.kdtree = kdtree.create([Item(adr.lat, adr.lng, adr) for adr in hmodels.Address.objects.all()])

    @classmethod
    def search(cls, point, r):
        if not cls.kdtree:
            cls.setup()
        nn = []
        cls.kdtree._search_nn_dist(point, r, nn, get_dist=lambda n: dist(point, n.data))
        results = [x.data for x in nn]
        return results

    @classmethod
    def knn(cls, point, k):
        if not cls.kdtree:
            cls.setup()
        results = cls.kdtree.search_knn(point, k, dist=dist)
        return [x[0].data.data for x in results]


class OverlapDateChecker(metaclass=Singleton):
    dict = None
    def __call__(self):
        self.setup()

    @classmethod
    def setup(cls):
        print('OverlapChecker etting up')
        cls.dict = {}
        for h in hmodels.Homestay.objects.all():
            cls.dict[h.pk] = IntervalTree()
        for contrast in hmodels.Contrast.objects.filter(state__gt=0):
            cls.add(contrast)

    @classmethod
    def check_available(cls, homestay, checkin, checkout):
        if not cls.dict:
            cls.setup()
        return cls.dict[homestay.pk][checkin:checkout + datetime.timedelta(days=1)]

    @classmethod
    def add(cls, contrast):
        cls.dict[contrast.homestay.pk].addi(contrast.checkin_date, contrast.checkout_date + datetime.timedelta(days=1),
                                            contrast)
