import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";

export class Program extends BaseModel{
  constructor(id: number, title: string){
    super(id, title);
  }
}

export class ProgramCollection extends BaseCollection{
  constructor(){
    super('/program');
  }
}
