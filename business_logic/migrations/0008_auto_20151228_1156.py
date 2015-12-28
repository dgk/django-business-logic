# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0007_auto_20151228_1144'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='type',
        ),
        migrations.RemoveField(
            model_name='resultmessage',
            name='message',
        ),
        migrations.RemoveField(
            model_name='resultmessage',
            name='result',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
        migrations.DeleteModel(
            name='MessageType',
        ),
        migrations.DeleteModel(
            name='ResultMessage',
        ),
    ]
