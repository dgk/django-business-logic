import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import {Observable} from "rxjs";

import * as find from "lodash/find";
import {BaseService} from "./base.service";

@Injectable()
export class ArgumentFieldService{

  constructor( private rest: RestService, private base: BaseService ){

  }

  getVerboseNameForField(value: string): any{
    //TODO: if getCurrent() return undefined?
    let programInterface = this.base.programInterfaces.getCurrent();

    let ind: number = value.indexOf(".");
    let arg_name: string = value.substr(0, ind);
    let field_name: string = value.substr(ind+1, value.length);

    if(programInterface){
      let args: any = this.getArguments();
      let arg: any = find(args, (arg) => {return arg["name"] == arg_name;});

      let result: any = find(arg.fields, (field) => {return field["name"] == field_name});

      if(result){
        return result["verbose_name"];
      }else{
        return value;
      }

    }
  }

  getFieldList(): any{
    let args = this.getArguments();
    let result = [];

    args.forEach( (arg) => {
      let arg_name = arg["name"];
      arg.fields.forEach((field) => {
        result.push([field["verbose_name"], arg_name + '.' + field["name"]]);
      });
    });
    return result;
  }

  getArguments(): any{
    return this.base.currentProgramInterface.getArguments();
  }

  generateXmlForToolbox(): string{
    let xml =   `<category name="Argument fields">`;

    this.getArguments().forEach((arg) => {
      xml += `<category name="${arg.verbose_name}">`;

      xml += `<block type="business_logic_argument_field_set">
                  <field name="VAR">${arg.name}.${arg.fields[0].name}</field>
                </block>`;
      arg.fields.forEach((field) => {
        xml += `<block type="business_logic_argument_field_get">
                  <field name="VAR">${arg.name}.${field.name}</field>
                </block>`;
      });
      xml += `</category>`;
    });

    xml += `</category>`;

    return xml;
  }

}
