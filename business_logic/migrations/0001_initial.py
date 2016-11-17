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
            name='ExceptionLog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('module', models.CharField(max_length=255)),
                ('type', models.CharField(max_length=255)),
                ('message', models.CharField(max_length=512)),
                ('traceback', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Execution',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('finish_time', models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExecutionArgument',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType')),
                ('execution', models.ForeignKey(related_name='arguments', to='business_logic.Execution')),
            ],
        ),
        migrations.CreateModel(
            name='ExecutionEnvironment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(unique=True, max_length=255, verbose_name='Title')),
                ('description', models.TextField(null=True, verbose_name='Description', blank=True)),
                ('debug', models.BooleanField(default=False)),
                ('log', models.BooleanField(default=False)),
                ('cache', models.BooleanField(default=True)),
                ('exception_handling_policy', models.CharField(default=b'INTERRUPT', max_length=15, verbose_name='Exception handling policy', choices=[(b'IGNORE', 'Ignore'), (b'INTERRUPT', 'Interrupt'), (b'RAISE', 'Raise')])),
            ],
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
            name='FunctionArgument',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, null=True, blank=True)),
                ('description', models.TextField(null=True, verbose_name='Description', blank=True)),
                ('order', models.PositiveIntegerField(default=0, db_index=True)),
            ],
            options={
                'ordering': ('order',),
                'verbose_name': 'Function argument',
                'verbose_name_plural': 'Function arguments',
            },
        ),
        migrations.CreateModel(
            name='FunctionArgumentChoice',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('order', models.PositiveIntegerField(default=0, db_index=True)),
                ('argument', models.ForeignKey(related_name='choices', to='business_logic.FunctionArgument')),
            ],
            options={
                'ordering': ('order',),
                'verbose_name': 'Function argument choice',
                'verbose_name_plural': 'Function argument choices',
            },
        ),
        migrations.CreateModel(
            name='FunctionDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(unique=True, max_length=255, verbose_name='Title')),
                ('description', models.TextField(null=True, verbose_name='Description', blank=True)),
                ('is_context_required', models.BooleanField(default=False, verbose_name='Is Context required')),
                ('is_returns_value', models.BooleanField(default=True, verbose_name='Is returns value')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FunctionLibrary',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(unique=True, max_length=255, verbose_name='Function library title')),
            ],
            options={
                'verbose_name': 'Function library',
                'verbose_name_plural': 'Function libraries',
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
                ('code', models.SlugField(unique=True, max_length=255, verbose_name='Code')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
                ('environment', models.ForeignKey(blank=True, to='business_logic.ExecutionEnvironment', null=True)),
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
                ('title', models.CharField(max_length=255, null=True, verbose_name='Title', blank=True)),
                ('program_argument', models.ForeignKey(related_name='fields', to='business_logic.ProgramArgument')),
            ],
            options={
                'ordering': ('name',),
                'verbose_name': 'Program argument field',
                'verbose_name_plural': 'Program argument fields',
            },
        ),
        migrations.CreateModel(
            name='ProgramInterface',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title', db_index=True)),
                ('code', models.SlugField(null=True, max_length=255, blank=True, unique=True, verbose_name='Code')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
                ('environment', models.ForeignKey(blank=True, to='business_logic.ExecutionEnvironment', null=True)),
            ],
            options={
                'verbose_name': 'Program interface',
                'verbose_name_plural': 'Program interfaces',
            },
        ),
        migrations.CreateModel(
            name='ProgramVersion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, null=True, verbose_name='Title', blank=True)),
                ('description', models.TextField(null=True, verbose_name='Description', blank=True)),
                ('is_default', models.BooleanField(default=False, verbose_name='Is default')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
                ('entry_point', models.ForeignKey(verbose_name='Entry point', to='business_logic.Node')),
                ('environment', models.ForeignKey(blank=True, to='business_logic.ExecutionEnvironment', null=True)),
                ('program', models.ForeignKey(related_name='versions', to='business_logic.Program')),
            ],
            options={
                'verbose_name': 'Program version',
                'verbose_name_plural': 'Program versions',
            },
        ),
        migrations.CreateModel(
            name='ReferenceConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Reference constant',
                'verbose_name_plural': 'Reference constants',
            },
        ),
        migrations.CreateModel(
            name='ReferenceDescriptor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, null=True, blank=True)),
                ('search_fields', models.TextField(null=True, blank=True)),
                ('name_field', models.SlugField(max_length=255, null=True, blank=True)),
                ('content_type', models.OneToOneField(to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Reference descriptor',
                'verbose_name_plural': 'Reference descriptors',
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
        migrations.CreateModel(
            name='PythonCodeFunctionDefinition',
            fields=[
                ('functiondefinition_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='business_logic.FunctionDefinition')),
                ('code', models.TextField(max_length=255, verbose_name='Code')),
            ],
            options={
                'verbose_name': 'Python code function definition',
                'verbose_name_plural': 'Python code function definition',
            },
            bases=('business_logic.functiondefinition',),
        ),
        migrations.CreateModel(
            name='PythonModuleFunctionDefinition',
            fields=[
                ('functiondefinition_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='business_logic.FunctionDefinition')),
                ('module', models.CharField(default=b'__builtins__', max_length=255, verbose_name='Module name')),
                ('function', models.CharField(max_length=255, verbose_name='Function name')),
            ],
            options={
                'verbose_name': 'Python module function definition',
                'verbose_name_plural': 'Python module function definition',
            },
            bases=('business_logic.functiondefinition',),
        ),
        migrations.AddField(
            model_name='variable',
            name='definition',
            field=models.ForeignKey(related_name='variables', to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='programargumentfield',
            name='variable_definition',
            field=models.OneToOneField(related_name='program_argument_field', to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='programargument',
            name='program_interface',
            field=models.ForeignKey(related_name='arguments', to='business_logic.ProgramInterface'),
        ),
        migrations.AddField(
            model_name='programargument',
            name='variable_definition',
            field=models.OneToOneField(related_name='program_argument', to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='program',
            name='program_interface',
            field=models.ForeignKey(to='business_logic.ProgramInterface'),
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
            model_name='functionlibrary',
            name='functions',
            field=models.ManyToManyField(related_name='libraries', to='business_logic.FunctionDefinition'),
        ),
        migrations.AddField(
            model_name='functiondefinition',
            name='polymorphic_ctype',
            field=models.ForeignKey(related_name='polymorphic_business_logic.functiondefinition_set+', editable=False, to='contenttypes.ContentType', null=True),
        ),
        migrations.AddField(
            model_name='functionargument',
            name='function',
            field=models.ForeignKey(related_name='arguments', to='business_logic.FunctionDefinition'),
        ),
        migrations.AddField(
            model_name='function',
            name='definition',
            field=models.ForeignKey(related_name='functions', to='business_logic.FunctionDefinition'),
        ),
        migrations.AddField(
            model_name='executionenvironment',
            name='libraries',
            field=models.ManyToManyField(related_name='environments', to='business_logic.FunctionLibrary', blank=True),
        ),
        migrations.AddField(
            model_name='executionargument',
            name='program_argument',
            field=models.ForeignKey(to='business_logic.ProgramArgument'),
        ),
        migrations.AddField(
            model_name='execution',
            name='log',
            field=models.OneToOneField(null=True, to='business_logic.LogEntry'),
        ),
        migrations.AddField(
            model_name='execution',
            name='program_version',
            field=models.ForeignKey(to='business_logic.ProgramVersion'),
        ),
        migrations.AddField(
            model_name='exceptionlog',
            name='log_entry',
            field=models.OneToOneField(related_name='exception', to='business_logic.LogEntry'),
        ),
        migrations.AlterUniqueTogether(
            name='programargumentfield',
            unique_together=set([('program_argument', 'name')]),
        ),
        migrations.AlterUniqueTogether(
            name='programargument',
            unique_together=set([('program_interface', 'name')]),
        ),
    ]
