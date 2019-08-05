# Generated by Django 2.2.1 on 2019-06-21 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('c4Backend', '0002_auto_20190620_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='keyword',
            name='keywordType',
            field=models.CharField(choices=[('TK', 'Topical Keyword'), ('AK', 'Activity Keyword')], max_length=2, verbose_name='Keyword Type'),
        ),
    ]
