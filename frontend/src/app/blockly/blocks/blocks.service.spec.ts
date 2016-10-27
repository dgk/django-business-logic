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

describe('blocks service', () => {
  let workspace: any;

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
  }) );

  it('swap BackendService to MockService', () => {
    expect( TestBed.get(BlocksService).backend.test() ).toEqual("This is MockService!");
  });

  it('our set value work fine in custom block', () => {
      TestBed.get(BlocksService).init();

      let xml = `<xml>
                      <block type="business_logic_reference">
                        <field name="TYPE">books.Book</field>
                        <field name="VALUE">2</field>
                      </block>
                 </xml>`;

      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

      let block = workspace.getTopBlocks(true)[0];
      expect( block.type ).toEqual("business_logic_reference");
      expect( block.init ).toEqual(Blockly.Blocks['business_logic_reference'].init);

      let field = block.getField("TYPE");

      expect( field ).toBeDefined();

      expect( field.getText() ).toEqual('Book[books.Book]');
      expect( field.getValue() ).toEqual('books.Book');
  });

});
