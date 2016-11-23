import { BaseModel } from './base.model';
import * as filter from 'lodash/filter';
import * as find from 'lodash/find';

export abstract class BaseCollection{
  baseUrl: string = '/business-logic/rest';

  url: string;
  models: Array<any> = [];
  currentID: number;

  constructor( url: string){
    this.url = url;
  }

  setCurrent(model: BaseModel){
    this.currentID = model.getID();
  }

  setCurrentID(id: number){
    this.currentID = id;
  }

  getCurrent(){
    if(this.models.length == 0){
      return undefined;
    }else{
      return find(this.models, (model) => {
        return model.getID() == this.currentID;
      });
    }

  }

  addNew(model: any){
    this.models.push(model);
  }

  getUrl(){
    return this.baseUrl + this.url;
  }

  getCollection(){
    return this.models;
  }

  getModelByID(id: number){
    return filter(this.models, (model) => {
      return model.getID() == id;
    })[0];
  }

  reset(models: BaseModel[]){
    this.models = models;
  }
}
