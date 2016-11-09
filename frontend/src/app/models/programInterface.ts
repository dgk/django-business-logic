import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";

export class ProgramInterface extends BaseModel{
  constructor(id: number, title: string){
    super(id, title);
    this.url = `/program-interface/${id}`;
  }
}

export class ProgramInterfaceCollection extends BaseCollection{
  constructor(){
    super('/program-interface');
  }
}
