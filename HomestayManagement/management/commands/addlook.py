from django.core.management.base import BaseCommand
from HomestayManagement.management.spiders.homestay import HomestayDotCom, AddressLockup
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from scrapy.utils.project import get_project_settings
import os


class Command(BaseCommand):
    help = 'Release the spiders'

    def handle(self, *args, **options):
        # os.environ['http_proxy'] = "http://localhost:8118"
        os.environ.setdefault('SCRAPY_SETTINGS_MODULE', 'HomestayManagement.management.settings')
        settings = get_project_settings()
        process = CrawlerProcess(settings)
        process.crawl(AddressLockup)
        process.start()