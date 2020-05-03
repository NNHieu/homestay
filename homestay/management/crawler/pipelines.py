# -*- coding: utf-8 -*-
import hashlib
import logging

import scrapy
from scrapy.exceptions import DropItem
from scrapy.pipelines.images import ImagesPipeline
from django.conf import settings
from django.db.models import Q

from homestay.models import *

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.utils.python import to_bytes

xpath_div0 = '(//div[@class="col-xs-12"])[1]'


def get_title(response):
    return response.xpath('//h1[@class="homestay-title"]/text()').get()


def get_description(response):
    return response.xpath('(//div[@class="col-xs-12"])[1]/p/text()').get()


def get_welcomes(response):
    welcomes = []
    for span in response.xpath(xpath_div0 + '/ul/li/span'):
        welcomes.append(span.xpath('text()').get())
    return welcomes


def get_house_facilities(response):
    house_facilities = []
    for span in response.xpath(xpath_div0 + '/ul/div//li/span'):
        house_facilities.append(span.xpath('string(.)').get())
    return house_facilities


def get_area(response):
    location_div = response.xpath('//div[contains(@class, "homestay-location")]')
    about_area = location_div.xpath('.//p/text()').get()

    tmp = response.xpath('//div[@class="map-block"]/div')
    address_lat = tmp.xpath('@data-lat').get()
    address_lng = tmp.xpath('@data-lng').get()
    local_area_facilities = []
    for span in location_div.xpath('.//ul//span'):
        local_area_facilities.append(span.xpath('string(.)').get())

    address_model = Address.objects.filter(lat=address_lat, lng=address_lng)
    if address_model.exists():
        address_model = address_model[0]
        # raise ValueError(f'Address with (lat, lng) = ({address_lat, address_lng}) already exists')
        logging.info(f'Address with (lat, lng) = ({address_lat, address_lng}) already exists')
    else:
        address_model = Address(lat=address_lat, lng=address_lng, about_area=about_area)
    return address_model, local_area_facilities


def get_meal(response):
    light_breakfast = False
    kitchen = False
    meal_lis = response.xpath('//div[contains(@class,"homestay-meals")]//li')
    if meal_lis[0].xpath('./i[contains(@class, "hs-icon-tick-thick")]'):
        light_breakfast = True
    if meal_lis[0].xpath('./i[contains(@class, "hs-icon-tick-thick")]'):
        kitchen = True
    return light_breakfast, kitchen


def get_rules(response):
    return response.xpath('normalize-space(//div[@class="homestay-rules"]//p[last()])').get()


class HomestayDotComPipeline(object):

    def process_item(self, item, spider):
        if item['from'] == 'homestay.com':
            response = item['response']
            title = get_title(response)
            description = get_description(response)
            welcomes = get_welcomes(response)
            house_facilities = get_house_facilities(response)
            address_model, local_area_facilities = get_area(response)
            light_breakfast, kitchen = get_meal(response)
            rules = get_rules(response)

            logging.info(f'tilte: {title}\n'
                         f'description: {description}\n'
                         f'welcomes: {welcomes}\n'
                         f'house_facilities: {house_facilities}\n'
                         f'image_urls: {item["images"]}'
                         f'add_lat: {address_model.lat}'
                         f'add_lng: {address_model.lng}'
                         f'about area: {address_model.about_area}\n'
                         f'local_area_facilities: {local_area_facilities}\n'
                         f'rules: {rules}')

            homestay = item['model']
            homestay.title = title
            homestay.description = description
            homestay.rules = rules
            homestay.light_breakfast = light_breakfast
            homestay.use_of_kitchen = kitchen

            address_model.save()
            homestay.address = address_model
            homestay.owner = get_user_model().objects.get(email='nnhieu@email.com')
            homestay.save()

            for f in house_facilities:
                facility = Facility.objects.filter(name=f)
                if not facility.exists():
                    facility = Facility(name=f)
                    facility.save()
                else:
                    facility = facility.get()
                homestay.facilities.add(facility)

            for f in local_area_facilities:
                facility = Facility.objects.filter(name=f)
                if not facility.exists():
                    facility = Facility(name=f, is_area_facility=True)
                    facility.save()
                else:
                    facility = facility.get()
                homestay.facilities.add(facility)

            images = item['image_paths']
            image_titles = item['image_titles']
            for i in range(len(images)):
                path = 'images/' + images[i]
                logging.info(path)
                image = ReviewImage.objects.filter(image=path)
                if not image.exists():
                    image = ReviewImage(image=path, homestay=homestay)
                else:
                    image = image[0]
                image.title = image_titles[i]
                logging.info(image.title)
                image.save()

        return item


class MyImagesPipeline(ImagesPipeline):

    def get_media_requests(self, item, info):
        self.hid = item['model'].homestay_dot_com_id
        for image_url in item['image_urls']:
            yield scrapy.Request(image_url)

    def item_completed(self, results, item, info):

        image_paths = [x['path'] for ok, x in results if ok]
        logging.info(image_paths[0])
        if not image_paths:
            raise DropItem("Item contains no images")
        item['image_paths'] = image_paths
        return item

    def file_path(self, request, response=None, info=None):
        super(MyImagesPipeline, self).file_path(request, response, info)
        image_guid = hashlib.sha1(to_bytes(request.url)).hexdigest()  # change to request.url after deprecation
        return f'homestay.com/{self.hid}/{image_guid}.jpg'
