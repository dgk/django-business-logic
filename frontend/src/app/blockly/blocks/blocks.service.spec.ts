import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlocksService } from "./blocks.service";
import { MockService } from "./mock.service";
import { BackendService } from "../../backend.service";

require('script!imports?module=>undefined!blockly/blockly_compressed.js');
require('script!imports?module=>undefined!blockly/blocks_compressed.js');
require('script!imports?module=>undefined!blockly/msg/js/ru.js');

describe('business_logic_reference block', () => {
  let workspace: any;
  let block: any;
  let xml = `<xml>
                      <block type="business_logic_reference">
                        <field name="TYPE">books.Book</field>
                        <field name="VALUE">2</field>
                      </block>
                 </xml>`;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        {provide: BackendService, useClass: MockService},
        BlocksService
      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();

    TestBed.get(BlocksService).init();

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    block = workspace.getTopBlocks(true)[0];
  }) );

  it('swap BackendService to MockService', () => {
    expect( TestBed.get(BlocksService).backend.test() ).toEqual("This is MockService!");
  });

  it('created block should be business_logic_reference, field.getText() return verbose_name+name, field.getValue() return name', () => {

      expect( block.type ).toEqual("business_logic_reference");
      expect( block.init ).toEqual(Blockly.Blocks['business_logic_reference'].init);

      let field = block.getField("TYPE");

      expect( field ).toBeDefined();

      expect( field.getText() ).toEqual('Book [books.Book]');
      expect( field.getValue() ).toEqual('books.Book');
  });

  it('field "VALUE" getText() should return text value instead id', () => {
    let field = block.getField("VALUE");

    expect( field ).toBeDefined();

    expect( field.getText() ).toEqual('Dive Into Python');
    expect( field.getValue() ).toEqual('2');
  });

});
