import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

// import { BlocklyComponent } from '../blockly.component';

require('script!imports?module=>undefined!blockly/blockly_compressed.js');
require('script!imports?module=>undefined!blockly/blocks_compressed.js');
require('script!imports?module=>undefined!blockly/msg/js/ru.js');

require('./reference.block.ts');

describe('reference block', () => {
  let workspace: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [

      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();

  }) );

  it('registered', () => {
    expect(Blockly.Blocks['business_logic_reference']).toBeDefined();
  });

  it('create from xml', () => {

    let xml = `<xml>
                    <block type="business_logic_reference">
                      <field name="REFERENCE_TYPE">books.Book</field>
                      <field name="VALUE">2</field>
                    </block>
               </xml>`;

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    let block = workspace.getTopBlocks(true)[0];
    expect( block.type ).toEqual("business_logic_reference");
    expect( block.init ).toEqual(Blockly.Blocks['business_logic_reference'].init);

    let field = block.getField("REFERENCE_TYPE");

    expect( field ).toBeDefined();
    expect( field instanceof Blockly.Field ).toBeTruthy();

    //expect( block.getFieldValue("REFERENCE_TYPE") ).toEqual(2);
  });


});
