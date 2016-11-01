import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";

export class Version extends BaseModel{

  constructor(id: number, title: string){
    super(id, title);
  }
}

export class VersionCollection extends BaseCollection{
  constructor(){
    super('/program-version');
  }
}
