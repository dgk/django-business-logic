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

describe('BlocklyComponent', () => {
  let workspace: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [ ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();

  }) );

  it('create block from xml', () => {

    let xml = '<xml><block type="factory_base" deletable="false" movable="false"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    let block = workspace.getTopBlocks(true)[0];
    expect( block.type ).toEqual("factory_base");
  });

  it('custom block', () => {
    Blockly.Blocks['ourCustom'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("Страна")
          .appendField("vzr.Country")
          .appendField(new Blockly.FieldDropdown([["spb", "1"], ["msk", "2"]]), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    let xml = '<xml><block type="ourCustom" deletable="false" movable="false"></block></xml>';

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);

    let block = workspace.getTopBlocks(true)[0];
    expect( block.type ).toEqual("ourCustom");
  });


});
