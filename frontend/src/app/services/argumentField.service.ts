import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import {Observable} from "rxjs";

import * as find from "lodash/find";
import {BaseService} from "./base.service";

@Injectable()
export class ArgumentFieldService{

  constructor( private rest: RestService, private base: BaseService ){

  }

  getVerboseNameForField(value: string){
    //TODO: if getCurrent() return undefined?
    let programInterface = this.base.programInterfaces.getCurrent();

    let tmp = value.split(".");

    if(programInterface){
      let args = this.base.getArguments();
      let arg = find(args, (arg) => {return arg.name == tmp[0];});
      return find(arg.fields, (field) => {return field.name == tmp[1]}).verbose_name;
    }
  }

  getFieldList(){
    let args = this.base.getArguments();
    let result = [];

    args.forEach( (arg) => {
      let arg_name = arg.name;
      arg.fields.forEach((field) => {
        result.push([field.verbose_name, arg.name + '.' + field.name]);
      });
    });
    return result;
  }

}
