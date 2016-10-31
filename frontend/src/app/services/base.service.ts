import { Injectable } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { RestService } from './rest.service';

export interface BaseServiceInterface {
  // getItemUrl(params: any): string;
  // getItem(id: number): BaseModel;
  // getItemList(): Array<BaseModel>;
  // getItemListUrl(): string;
  // getCurrent(): BaseModel;
  // setCurrent(model: BaseModel): void;
}

@Injectable()
export class BaseService implements BaseServiceInterface{
  protected baseUrl = '/business-logic/rest';
  protected rest: any;

  constructor(rest: RestService){
    this.rest = rest;
  }


  getItemListUrl(){
    return '';
  }

  getItemList(){
    return this.rest.get(this.getItemListUrl());
  }
}
