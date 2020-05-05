# Generated by Django 3.0.3 on 2020-05-04 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homestay', '0007_auto_20200504_0558'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contrast',
            name='checkin_date',
            field=models.DateField(verbose_name='Check in'),
        ),
        migrations.AlterField(
            model_name='contrast',
            name='checkout_date',
            field=models.DateField(verbose_name='Check out'),
        ),
        migrations.AlterField(
            model_name='reviewimage',
            name='first_save',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
