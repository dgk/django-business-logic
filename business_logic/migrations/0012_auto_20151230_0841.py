# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0011_referencedescriptor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='name',
            field=models.SlugField(unique=True, max_length=255, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='referencedescriptor',
            name='content_type',
            field=models.ForeignKey(to='contenttypes.ContentType', unique=True),
        ),
    ]
