# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import business_logic.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Assignment',
                'verbose_name_plural': 'Assignments',
            },
        ),
        migrations.CreateModel(
            name='BinaryOperator',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('operator', models.CharField(max_length=3, verbose_name='Operator')),
            ],
            options={
                'verbose_name': 'Binary operator',
                'verbose_name_plural': 'Binary operators',
            },
        ),
        migrations.CreateModel(
            name='BooleanConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.BooleanField(verbose_name='Value')),
            ],
            options={
                'verbose_name': 'Boolean constant',
                'verbose_name_plural': 'Boolean constants',
            },
        ),
        migrations.CreateModel(
            name='BreakLoop',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Break instruction',
                'verbose_name_plural': 'Break instructions',
            },
        ),
        migrations.CreateModel(
            name='DateConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.DateField(verbose_name='Value')),
            ],
            options={
                'verbose_name': 'Date constant',
                'verbose_name_plural': 'Date constants',
            },
        ),
        migrations.CreateModel(
            name='ForeachStatement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Foreach statement',
                'verbose_name_plural': 'Foreach statements',
            },
        ),
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Function',
                'verbose_name_plural': 'Functions',
            },
        ),
        migrations.CreateModel(
            name='FunctionDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('module', models.CharField(default=b'__builtins__', max_length=255, verbose_name='Module name')),
                ('function', models.CharField(max_length=255, verbose_name='Function name')),
                ('context_required', models.BooleanField(default=False, verbose_name='Context required')),
                ('title', models.CharField(max_length=255, verbose_name='Function title')),
            ],
            options={
                'verbose_name': 'Function definition',
                'verbose_name_plural': 'Function definitions',
            },
        ),
        migrations.CreateModel(
            name='IfStatement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'If statement',
                'verbose_name_plural': 'If statements',
            },
        ),
        migrations.CreateModel(
            name='ListConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'List constant',
                'verbose_name_plural': 'List constants',
            },
        ),
        migrations.CreateModel(
            name='LogEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sib_order', models.PositiveIntegerField()),
                ('previous_value', models.CharField(max_length=255, verbose_name='Previous value')),
                ('current_value', models.CharField(max_length=255, verbose_name='Current value')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ModelConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.BooleanField(verbose_name='Value')),
            ],
            options={
                'verbose_name': 'Model constant',
                'verbose_name_plural': 'Model constants',
            },
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lft', models.PositiveIntegerField(db_index=True)),
                ('rgt', models.PositiveIntegerField(db_index=True)),
                ('tree_id', models.PositiveIntegerField(db_index=True)),
                ('depth', models.PositiveIntegerField(db_index=True)),
                ('comment', models.CharField(max_length=255, null=True, verbose_name='Comment', blank=True)),
                ('object_id', models.PositiveIntegerField(null=True)),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType', null=True)),
            ],
            options={
                'ordering': ['tree_id', 'lft'],
                'verbose_name': 'Program node',
                'verbose_name_plural': 'Program nodes',
            },
        ),
        migrations.CreateModel(
            name='NumberConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.FloatField(verbose_name='Value')),
            ],
            options={
                'verbose_name': 'Float constant',
                'verbose_name_plural': 'Float constants',
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('name', models.SlugField(unique=True, max_length=255, verbose_name='Name')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Program',
                'verbose_name_plural': 'Programs',
            },
        ),
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
        migrations.CreateModel(
            name='ProgramArgumentField',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', business_logic.fields.DeepAttributeField(max_length=255, verbose_name='Name')),
                ('program_argument', models.ForeignKey(related_name='field', to='business_logic.ProgramArgument')),
            ],
            options={
                'ordering': ('name',),
                'verbose_name': 'Program argument field',
                'verbose_name_plural': 'Program argument fields',
            },
        ),
        migrations.CreateModel(
            name='ProgramType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title', db_index=True)),
                ('name', models.SlugField(null=True, max_length=255, blank=True, unique=True, verbose_name='Name')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Program type',
                'verbose_name_plural': 'Program types',
            },
        ),
        migrations.CreateModel(
            name='ProgramVersion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.TextField(null=True, verbose_name='Description', blank=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
                ('is_default', models.NullBooleanField(default=None, verbose_name='Is default')),
                ('entry_point', models.ForeignKey(verbose_name='Entry point', to='business_logic.Node')),
                ('program', models.ForeignKey(related_name='versions', to='business_logic.Program')),
            ],
            options={
                'verbose_name': 'Program version',
                'verbose_name_plural': 'Program versions',
            },
        ),
        migrations.CreateModel(
            name='ReferenceDescriptor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('search_fields', models.TextField()),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Reference descriptor',
                'verbose_name_plural': 'Reference descriptors',
            },
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Result',
                'verbose_name_plural': 'Results',
            },
        ),
        migrations.CreateModel(
            name='StopInterpretation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Stop instruction',
                'verbose_name_plural': 'Stop instructions',
            },
        ),
        migrations.CreateModel(
            name='StringConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.TextField(default=b'', verbose_name='Value')),
            ],
            options={
                'verbose_name': 'String constant',
                'verbose_name_plural': 'String constants',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Table',
                'verbose_name_plural': 'Tables',
            },
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=12, verbose_name='Type', choices=[(b'bool', 'Boolean'), (b'float', 'Float'), (b'string', 'String'), (b'model', 'Model')])),
                ('is_list', models.BooleanField(verbose_name='Is list')),
                ('model_type', models.ForeignKey(verbose_name='Model type', to='contenttypes.ContentType', null=True)),
            ],
            options={
                'verbose_name': 'Type',
                'verbose_name_plural': 'Types',
            },
        ),
        migrations.CreateModel(
            name='UnaryOperator',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('operator', models.CharField(max_length=3, verbose_name='Operator')),
            ],
            options={
                'verbose_name': 'Unary operator',
                'verbose_name_plural': 'Unary operators',
            },
        ),
        migrations.CreateModel(
            name='Variable',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Variable',
                'verbose_name_plural': 'Variables',
            },
        ),
        migrations.CreateModel(
            name='VariableDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField(verbose_name='Variable name')),
            ],
            options={
                'verbose_name': 'Variable definition',
                'verbose_name_plural': 'Variable definitions',
            },
        ),
        migrations.AddField(
            model_name='variable',
            name='definition',
            field=models.ForeignKey(related_name='variables', to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='programargument',
            name='program_type',
            field=models.ForeignKey(related_name='argument', to='business_logic.ProgramType'),
        ),
        migrations.AddField(
            model_name='programargument',
            name='variable_definition',
            field=models.OneToOneField(to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='program',
            name='program_type',
            field=models.ForeignKey(to='business_logic.ProgramType'),
        ),
        migrations.AddField(
            model_name='logentry',
            name='node',
            field=models.ForeignKey(verbose_name='Program node', to='business_logic.Node'),
        ),
        migrations.AddField(
            model_name='logentry',
            name='parent',
            field=models.ForeignKey(related_name='children', blank=True, to='business_logic.LogEntry', null=True),
        ),
        migrations.AddField(
            model_name='function',
            name='definition',
            field=models.ForeignKey(related_name='functions', to='business_logic.FunctionDefinition'),
        ),
        migrations.AlterUniqueTogether(
            name='programversion',
            unique_together=set([('program', 'is_default')]),
        ),
        migrations.AlterUniqueTogether(
            name='programargument',
            unique_together=set([('program_type', 'name')]),
        ),
    ]
