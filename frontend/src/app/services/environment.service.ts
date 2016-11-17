import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {RestService} from "./rest.service";

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
