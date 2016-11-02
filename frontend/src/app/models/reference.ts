import { BaseCollection } from "./base.collection";
import * as find from "lodash/find";

export class Reference{
  baseUrl: string = '/business-logic/rest';

  id: number;
  name: string;
  verbose_name: string;
  url: string;

  constructor( id: number, name: string, verbose_name: string ){
    this.id = id;
    this.name = name;
    this.verbose_name = verbose_name;

    this.url = `/reference/${name}`;
  }

  getID(): number{
    return this.id;
  }

  getName(): string{
    return this.name;
  }

  getVerboseName(): string{
    return this.verbose_name;
  }

  getUrl(): string{
    return this.baseUrl + this.url;
  }
}

export class ReferenceCollection extends BaseCollection{
  constructor(){
    super('/reference/descriptor');
  }

  findByName(name: string){

    return find(this.models, (model) => {
      return model.name == name;
    });

  }

  resetCollection(){
    this.models = [];
  }
}
