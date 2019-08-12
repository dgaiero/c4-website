# Generated by Django 2.2.1 on 2019-06-21 04:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('c4Backend', '0003_auto_20190620_2023'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='organization',
        ),
        migrations.AddField(
            model_name='user',
            name='organization',
            field=models.ManyToManyField(to='c4Backend.Organization', verbose_name='Affiliated Organization'),
        ),
    ]