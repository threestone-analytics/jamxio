# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-19 00:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_report'),
    ]

    operations = [
        migrations.RenameField(
            model_name='report',
            old_name='title',
            new_name='name',
        ),
    ]
