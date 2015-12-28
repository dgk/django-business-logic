# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import business_logic.fields


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0008_auto_20151228_1156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programargumentfield',
            name='name',
            field=business_logic.fields.DeepAttributeField(max_length=255, verbose_name='Name'),
        ),
    ]
