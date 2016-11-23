import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlocksService } from "../app/blocks/blocks.service";
import { MockService } from "./mock.service";
// import {ArgumentFieldGet} from "../app/blocks/fields/argument_field_get";
import {ArgumentFieldService} from "../app/services/argumentField.service";
import {ReferenceService} from "../app/services/reference.service";
import {EnvironmentService} from "../app/services/environment.service";

describe('business_logic_argument_get business_logic_argument_set block', () => {
  let workspace: any;

  let block_get: any;
  let block_set: any;
  let block_function: any;

  let xml_get = `<xml>
                    <block type="business_logic_argument_field_get">
                      <field name="VAR">book.title</field>
                    </block>
                 </xml>`;

  let xml_set = `<xml>
                    <block type="business_logic_argument_field_set">
                      <field name="VAR">book.title</field>
                    </block>
                 </xml>`;

  let xml_function = `<xml>
                          <block type="business_logic_function">
                            <mutation args="true"></mutation>
                            <field name="FUNC">Get Book from the shelf</field>
                            
                            <value name="ARG0">
                                <block type="math_number">
                                    <field name="NUM">10000</field>
                                </block>
                            </value>
                          </block>
                       </xml>`;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        // {provide: RestService, useClass: MockService},
        {provide: ArgumentFieldService, useClass: MockService},
        {provide: ReferenceService, useClass: MockService},
        {provide: EnvironmentService, useClass: MockService},
        BlocksService
      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();
    TestBed.get(BlocksService).init();
  }));

  it('swap ArgFieldService to MockService', () => {
    expect( TestBed.get(BlocksService).test() ).toEqual("This is BlocksService!");

    expect( TestBed.get(BlocksService).argField.test() ).toEqual("This is MockService!");
  });

  it('block type = business_logic_argument_field_get getText() getValue() test', () => {

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml_get), workspace);
    block_get = workspace.getTopBlocks(true)[0];

    expect( block_get.type ).toEqual("business_logic_argument_field_get");

    let text = block_get.getField("VAR").getText();
    expect(text).toEqual('Book title');

    let value = block_get.getField("VAR").getValue();
    expect(value).toEqual('book.title');
  });

  it('block type = business_logic_argument_field_set getText() getValue() test', () => {

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml_set), workspace);
    block_set = workspace.getTopBlocks(true)[0];

    expect( block_set.type ).toEqual("business_logic_argument_field_set");

    let text = block_set.getField("VAR").getText();
    expect(text).toEqual('Book title');

    let value = block_set.getField("VAR").getValue();
    expect(value).toEqual('book.title');
  });



  it('Block business_logic_function_noreturn', () => {

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml_function), workspace);
    block_function = workspace.getTopBlocks(true)[0];

    expect( block_function.type ).toEqual("business_logic_function");

    let func = block_function.getField("FUNC").getValue();
    expect(func).toEqual('Get Book from the shelf');

    expect(block_function.environment.test()).toEqual('This is MockService!');

    let arg0 = block_function.getField("ARG0").getValue();
    expect(arg0).toEqual(10000);

  });

});
