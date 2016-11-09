import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlocksService } from "../app/components/blockly/blocks/blocks.service";
import { MockService } from "./mock.service";
import { RestService } from "../app/services/rest.service";
import {ArgumentFieldGet} from "../app/components/blockly/blocks/argument_field_get";
import {ReferenceService} from "../app/services/reference.service";

describe('business_logic_argument_get block', () => {
  let workspace: any;
  let block: any;
  let xml = `<xml>
                  <block type="business_logic_argument_get">
                    <field name="NAME">book.title</field>
                  </block>
             </xml>`;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        {provide: RestService, useClass: MockService},
        {provide: ReferenceService, useClass: MockService},
        BlocksService
      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();

    TestBed.get(BlocksService).initArgSet();

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    block = workspace.getTopBlocks(true)[0];
  }) );

  it('swap BackendService to MockService', () => {
    expect( TestBed.get(BlocksService).backend.test() ).toEqual("This is MockService!");
  });

  it('getText() getValue() test', () => {
    expect( block.type ).toEqual("business_logic_argument_get");

    let text = block.getField("NAME").getText();
    expect(text).toEqual('Book title');

    let value = block.getField("NAME").getValue();
    expect(text).toEqual('book.title');
  });

});
