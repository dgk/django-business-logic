import {
  inject,
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProgramInterfaceService } from './programInterface.service';
import { RestService } from './rest.service';
import { RestMockService } from './rest.mock.service';

import { ProgramInterface } from '../models/programInterface.model';
import 'rxjs/Rx';
// import { BaseService } from './base.service';


describe('ProgramInterfaceService', () => {
  let programInterfaceService;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        { provide: RestService, useClass: RestMockService },
        ProgramInterfaceService
      ],
      schemas:[ NO_ERRORS_SCHEMA ]
    });

    programInterfaceService = TestBed.get(ProgramInterfaceService);
  }) );

  it("getItemList() return Array<ProgramInterface>", () => {

    console.log(programInterfaceService.rest);

    // let itemList = programInterfaceService.getItemList();
    //
    // itemList.subscribe((data) => {
    //   console.log(data);
    //   expect( data.results. ).toEqual();
    // });
    // // console.log(  programInterfaceService.getItemList() );
    //
    // expect( programInterfaceService.itemList ).toEqual();
    // expect( programInterfaceService.itemList[0] instanceof ProgramInterface).toBeTruthy();
  });



});
