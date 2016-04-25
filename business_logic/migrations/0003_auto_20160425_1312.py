# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0002_auto_20160425_0816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referencedescriptor',
            name='content_type',
            field=models.ForeignKey(to='contenttypes.ContentType', unique=True),
        ),
    ]
