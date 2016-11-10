import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import {Observable} from "rxjs";

import * as find from "lodash/find";
import {BaseService} from "./base.service";

@Injectable()
export class ArgumentFieldService{
  arguments: any;

  constructor( private rest: RestService, private base: BaseService ){

  }

  getVerboseNameForField(value: string): any{
    //TODO: if getCurrent() return undefined?
    let programInterface = this.base.programInterfaces.getCurrent();

    let tmp = value.split(".");

    if(programInterface){
      let args = this.getArguments();
      let arg = find(args, (arg) => {return arg.name == tmp[0];});
      return find(arg.fields, (field) => {return field.name == tmp[1]}).verbose_name;
    }
  }

  getFieldList(): any{
    let args = this.getArguments();
    let result = [];

    args.forEach( (arg) => {
      let arg_name = arg.name;
      arg.fields.forEach((field) => {
        result.push([field.verbose_name, arg.name + '.' + field.name]);
      });
    });
    return result;
  }

  fetchArguments(){
    let url = this.base.programInterfaces.getCurrent().getUrl();
    return this.rest.get(url).map((data) => {
      this.arguments = data["arguments"];
    })
  }

  getArguments(){
    return this.arguments;
  }

  generateXmlForToolbox(): string{
    let xml =   `<category name="Argument fields">`;

    this.arguments.forEach((arg) => {
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
