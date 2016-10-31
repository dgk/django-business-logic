import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RestService } from './rest.service';

import { ProgramInterface } from '../models/programInterface.model';

@Injectable()
export class ProgramInterfaceService extends BaseService{

  constructor( rest: RestService ){
    super(rest);
  }

  getItemListUrl(){
    return `${this.baseUrl}/program-interface`;
  }

  createItems(){
    this.getItemList().subscribe((data) => {
      data.map((item_data) => {
        //new ProgramInterface();
      });
    });
  }
}
