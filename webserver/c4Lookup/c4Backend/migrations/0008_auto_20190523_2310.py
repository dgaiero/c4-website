# Generated by Django 2.2.1 on 2019-05-24 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('c4Backend', '0007_auto_20190523_2308'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='emailAddress',
            field=models.EmailField(max_length=254, unique=True, verbose_name='Email Address'),
        ),
    ]
