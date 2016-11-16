import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";

export class Version extends BaseModel{
  description: string;

  constructor(id: number, title: string, description: string){
    super(id, title);
    this.description = description;
    this.url = `/program-version/${this.id}`;
  }

  getDescription(){
    return this.description;
  }
}

export class VersionCollection extends BaseCollection{
  constructor(){
    super('/program-version');
  }

  static getBaseURL(){
    return '/business-logic/rest/program-version'
  }
}
