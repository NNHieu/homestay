from django.core.management.base import BaseCommand
from ..crawler.spiders.homestay import HomestayDotCom
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from scrapy.utils.project import get_project_settings
import os
from ..crawler import settings


class Command(BaseCommand):
    help = 'Release the spiders'

    def handle(self, *args, **options):
        # os.environ['http_proxy'] = "http://localhost:8118"
        os.environ.setdefault('SCRAPY_SETTINGS_MODULE', settings.BASE+'.settings')
        pjsettings = get_project_settings()
        process = CrawlerProcess(pjsettings)
        process.crawl(HomestayDotCom)
        process.start()


# def get_spider_settings():
#     """
#     For the given spider_pipelines(dict) create a scrapy Settings object with
#     the common settings for each spider/datafetch.
#
#     Returns:
#         Scrapy settings class instance
#     """
#     os.environ['http_proxy'] = "http://localhost:8118"
#     settings = Settings()
#     pipelines = {
#         'hms.datafetch.pipelines.HomestayDotComPipeline': 100,
#     }
#
#     downloader_middleware = {
#         'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 1,
#     }
#     settings.set('ROBOTSTXT_OBEY', False)
#     settings.set('BOT_NAME', 'hi')
#     settings.set("TELNETCONSOLE_PORT", None)
#     settings.set('DOWNLOAD_DELAY', 3)
#     settings.set("DOWNLOAD_TIMEOUT", 800)
#     settings.set("ITEM_PIPELINES", pipelines)
#     settings.set("DOWNLOADER_MIDDLEWARES", downloader_middleware)
#     settings.set("USER_AGENT", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0")
#
#     return settings
