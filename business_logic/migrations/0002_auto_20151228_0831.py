# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('business_logic', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramArgument',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.SlugField(max_length=255, verbose_name='Name')),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Program argument',
                'verbose_name_plural': 'Program arguments',
            },
        ),
        migrations.AlterUniqueTogether(
            name='argument',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='argument',
            name='argument_set',
        ),
        migrations.RemoveField(
            model_name='argument',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='programtype',
            name='input_argumets',
        ),
        migrations.RemoveField(
            model_name='programtype',
            name='output_argumets',
        ),
        migrations.RemoveField(
            model_name='program',
            name='active_version',
        ),
        migrations.RemoveField(
            model_name='program',
            name='testing_version',
        ),
        migrations.RemoveField(
            model_name='program',
            name='type',
        ),
        migrations.AddField(
            model_name='program',
            name='name',
            field=models.SlugField(default='xxx', max_length=255, verbose_name='Name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='programversion',
            name='description',
            field=models.TextField(null=True, verbose_name='Description', blank=True),
        ),
        migrations.AddField(
            model_name='programversion',
            name='is_default',
            field=models.NullBooleanField(default=None, verbose_name='Is default'),
        ),
        migrations.AlterUniqueTogether(
            name='programversion',
            unique_together=set([('program', 'is_default')]),
        ),
        migrations.DeleteModel(
            name='Argument',
        ),
        migrations.DeleteModel(
            name='ArgumentSet',
        ),
        migrations.DeleteModel(
            name='ProgramType',
        ),
        migrations.AddField(
            model_name='programargument',
            name='program',
            field=models.ForeignKey(to='business_logic.Program'),
        ),
        migrations.RemoveField(
            model_name='programversion',
            name='title',
        ),
        migrations.AlterUniqueTogether(
            name='programargument',
            unique_together=set([('program', 'name')]),
        ),
    ]
