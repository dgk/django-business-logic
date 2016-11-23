import { BaseCollection } from "./base.collection";
import { BaseModel } from "./base.model";
import {Environment, Library, Function, Arg, Choice} from "./environment";

export class ProgramInterface extends BaseModel{
  args = null;
  environment = null;


  constructor(id: number, title: string){
    super(id, title);
    this.url = `/program-interface/${id}`;
  }

  setEnvironment(data: any){
    if(data) this.environment = new Environment(data);
  }

  setArgs(args: any){
    this.args = args;
  }

  getArguments(){
    return this.args;
  }

  getEnvironment(){
    return this.environment;
  }
}

export class ProgramInterfaceCollection extends BaseCollection{
  constructor(){
    super('/program-interface');
  }
}
