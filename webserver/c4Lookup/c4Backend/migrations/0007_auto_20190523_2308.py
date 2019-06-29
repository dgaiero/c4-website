# Generated by Django 2.2.1 on 2019-05-24 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('c4Backend', '0006_auto_20190523_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='keyword',
            name='keywordDescription',
            field=models.TextField(blank=True, help_text='A short, optional description of the keyword.', null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='dateAdded',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='department',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Department Name'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='website',
            field=models.URLField(blank=True, null=True, verbose_name='Website'),
        ),
    ]
