import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";

export class Version extends BaseModel{

  constructor(id: number, title: string){
    super(id, title);
    this.url = `/program-version/${this.id}`;
  }
}

export class VersionCollection extends BaseCollection{
  constructor(){
    super('/program-version');
  }
}
