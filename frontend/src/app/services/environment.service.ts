import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {RestService} from "./rest.service";

import * as find from 'lodash/find';

@Injectable()
export class EnvironmentService {

  constructor(private base: BaseService){

  }

  getEnvironment(){
    return this.base.currentVersion.getEnvironment()
      || this.base.currentProgramInterface.getEnvironment();
  }

  getFunction(func_name: string){

    let env = this.getEnvironment();
    let func;

    env['libraries'].forEach((lib) => {
      func = lib.getFunctionByName(func_name);
    });

    return func;
  }

  getChoicesFor(func: any, arg_name: string){
    let choices = [];

    let arg = find(func["args"], (arg: any) => {return arg.getName() == arg_name});
    arg["choices"].forEach((choice) => {
      choices.push([choice['title'], choice['value']]);
    });

    return choices;
  }

  generateXmlForToolbox(){
    let xml =   `<category name="Function libraries">`;

    this.getEnvironment()['libraries'].forEach((lib) => {
      xml += `<category name="${lib.title}">`;

      lib['functions'].forEach((func) => {
        xml += `<block type="business_logic_function">
                    <mutation args="true"></mutation>
                    <field name="FUNC">${func.title}</field>
                    
                </block>`;
      });

      xml += `</category>`;
    });

    xml += `</category>`;

    return xml;
  }
}
