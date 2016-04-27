# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0005_auto_20160426_1204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referencedescriptor',
            name='content_type',
            field=models.OneToOneField(to='contenttypes.ContentType'),
        ),
    ]
