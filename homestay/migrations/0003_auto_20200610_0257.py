# Generated by Django 3.0.6 on 2020-06-10 02:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homestay', '0002_auto_20200610_0220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='homestay.Facility'),
        ),
    ]
