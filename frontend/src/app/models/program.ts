import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";
import {Environment} from "./environment";

export class Program extends BaseModel{
  environment = null;

  constructor(id: number, title: string){
    super(id, title);
  }

  setEnvironment(data: any){
    if(data) this.environment = new Environment(data);
  }

  getEnvironment(){
    return this.environment;
  }
}

export class ProgramCollection extends BaseCollection{
  constructor(){
    super('/program');
  }
}
