# Generated by Django 3.0.3 on 2020-05-01 06:02

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('homestay', '0003_reviewimage_first_save'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewimage',
            name='first_save',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 1, 6, 2, 3, 361617, tzinfo=utc), null=True),
        ),
    ]