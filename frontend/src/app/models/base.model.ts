import { BaseCollection } from "./base.collection";

export abstract class BaseModel{
  baseUrl: string = '/business-logic/rest';

  id: number;
  url: string;
  title: string;

  constructor(id: number, title: string){
    this.id = id;
    this.title = title;
  }

  getID(): number{
    return this.id;
  }

  getUrl(): string{
    return this.baseUrl + this.url;
  }

  getTitle(): string{
    return this.title;
  }
}
