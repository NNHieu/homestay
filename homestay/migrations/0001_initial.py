# Generated by Django 3.0.6 on 2020-06-10 02:20

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('address_line1', models.CharField(max_length=200)),
                ('address_line2', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('postal_code', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
                ('how_to_find', models.CharField(max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now=True, verbose_name='Create date')),
                ('checkin_date', models.DateField(verbose_name='Check in')),
                ('checkout_date', models.DateField(verbose_name='Check out')),
                ('state', models.SmallIntegerField(choices=[(1, 'Just create'), (2, 'confirmed/deposited'), (3, 'Operational'), (0, 'Completed'), (-1, 'Canceled Before Confirm'), (-2, 'Canceled After Confirm'), (-3, 'Noshow')], verbose_name='state')),
            ],
        ),
        migrations.CreateModel(
            name='DetailDescription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rules', models.TextField(max_length=1000, verbose_name='House rules')),
            ],
        ),
        migrations.CreateModel(
            name='Facility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('description', models.CharField(blank=True, max_length=50)),
                ('is_leaf', models.BooleanField()),
            ],
            options={
                'verbose_name_plural': 'Facilities',
            },
        ),
        migrations.CreateModel(
            name='GuestInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('first_name', models.CharField(max_length=50, verbose_name='First name')),
                ('last_name', models.CharField(max_length=50, verbose_name='Last name')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, verbose_name='Phone number')),
            ],
        ),
        migrations.CreateModel(
            name='HCImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50)),
                ('public_id', models.CharField(max_length=100, verbose_name='Cloudinary Public Id')),
                ('first_save', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Homestay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('homestay_type', models.SmallIntegerField(choices=[(1, 'Apartment'), (2, 'Bungalow'), (3, 'Ground house'), (4, 'Villa')], verbose_name='Type')),
                ('area', models.FloatField(verbose_name='Area')),
                ('capacity', models.PositiveSmallIntegerField()),
                ('bathroom', models.PositiveSmallIntegerField()),
                ('bedroom', models.PositiveSmallIntegerField()),
                ('title', models.CharField(max_length=35)),
                ('general_description', models.TextField(max_length=1000)),
                ('facilities', models.ManyToManyField(to='homestay.Facility')),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('min_price', models.FloatField()),
                ('additionFrom', models.PositiveSmallIntegerField()),
                ('addition', models.FloatField()),
                ('payment_method', models.SmallIntegerField(choices=[(1, 'Transfer'), (2, 'COD')], verbose_name='Payment Method')),
                ('cancellation_policy', models.SmallIntegerField(choices=[(1, 'Flexibility'), (2, 'Law'), (3, 'Strict')], verbose_name='Cancellation Policy')),
            ],
        ),
        migrations.CreateModel(
            name='UnavailableDate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_weekly', models.BooleanField()),
                ('is_monthly', models.BooleanField()),
                ('is_yearly', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('overall', models.SmallIntegerField(verbose_name='Overall')),
                ('facility', models.SmallIntegerField(choices=[(1, 'Terrible'), (2, 'Bad'), (3, 'Normal'), (4, 'Good'), (5, 'Terrific')], verbose_name='Facility')),
                ('cleanliness', models.SmallIntegerField(choices=[(1, 'Terrible'), (2, 'Bad'), (3, 'Normal'), (4, 'Good'), (5, 'Terrific')], verbose_name='Cleanliness')),
                ('comfort', models.SmallIntegerField(choices=[(1, 'Terrible'), (2, 'Bad'), (3, 'Normal'), (4, 'Good'), (5, 'Terrific')], verbose_name='Comfort')),
                ('location', models.SmallIntegerField(choices=[(1, 'Terrible'), (2, 'Bad'), (3, 'Normal'), (4, 'Good'), (5, 'Terrific')], verbose_name='Location')),
                ('valueformoney', models.SmallIntegerField(choices=[(1, 'Terrible'), (2, 'Bad'), (3, 'Normal'), (4, 'Good'), (5, 'Terrific')], verbose_name='Value For Money')),
                ('feedback', models.TextField(max_length=1000, verbose_name='Feedback')),
                ('contract', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='homestay.Contract', verbose_name='Contract')),
                ('homestay_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='homestay.Homestay', verbose_name='Homestay')),
            ],
        ),
    ]
