# Generated by Django 2.2.1 on 2019-06-03 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('c4Backend', '0010_auto_20190603_1349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='orgType',
            field=models.CharField(choices=[('IO', 'Institution'), ('CY', 'City'), ('CO', 'County')], default=2, max_length=2, verbose_name='Organization Type'),
        ),
    ]