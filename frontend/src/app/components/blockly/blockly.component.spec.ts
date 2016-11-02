import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


import { BlocklyComponent } from './blockly.component';

import {MockService} from "./blocks/mock.service";
import { BlocksService } from "./blocks/blocks.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

require('script!imports?module=>undefined!blockly/blockly_compressed.js');
require('script!imports?module=>undefined!blockly/blocks_compressed.js');
require('script!imports?module=>undefined!blockly/msg/js/ru.js');

describe('blockly component', () => {
  let workspace: any;
  let comp:    BlocklyComponent;
  let fixture: ComponentFixture<BlocklyComponent>;

  // provide our implementations or mocks to the dependency injector
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocklyComponent ],
      providers: [
        // {provide: BackendService, useClass: MockService},
        {provide: ActivatedRoute, useValue: ''},
        {provide: Router, useValue: ''},
        BlocksService
      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    workspace = new Blockly.Workspace();
    fixture = TestBed.createComponent(BlocklyComponent);
    comp = fixture.componentInstance;

  }) );

  // it('swap services', () => {
  //   expect(TestBed.get(Router)).toEqual('');
  //   expect(TestBed.get(ActivatedRoute)).toEqual('');
  // });

});
