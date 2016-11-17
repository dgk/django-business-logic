import { Injectable } from '@angular/core';

import * as find from "lodash/find";
import { ReferenceService } from "../services/reference.service";
import {RestService} from "../services/rest.service";
import {ArgumentFieldService} from "../services/argumentField.service";
import {ReferenceLabelField} from "./fields/label_field";
import {ReferenceDropdownField} from "./fields/dropdown_field";
import {ArgumentField} from "./fields/argument_field";
// import {MockService} from "../../tests/mock.service";
import {FunctionLabelField} from "./fields/func_label_field";
import {EnvironmentService} from "../services/environment.service";

@Injectable()
export class BlocksService {
  constructor(
    public refService: ReferenceService,
    public argField: ArgumentFieldService,
    public environment: EnvironmentService){
  }

  init(){
    let that = this;
    Blockly.Blocks['business_logic_reference'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new ReferenceLabelField(that.refService), 'TYPE')
          .appendField(new ReferenceDropdownField(that.refService), "VALUE");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour('#0078d7');
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    Blockly.Blocks['business_logic_argument_field_get'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new ArgumentField("item", that.argField), "VAR");
        this.setOutput(true, null);
        this.setColour('#35bdb2');
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    //attention: this is crutch!
    let msg = Blockly.Msg.VARIABLES_SET.substr(0, Blockly.Msg.VARIABLES_SET.indexOf('%') );

    Blockly.Blocks['business_logic_argument_field_set'] = {
      init: function () {
        this.appendValueInput("VALUE")
          .setCheck(null)
          .appendField(msg)
          .appendField(new ArgumentField("item", that.argField), "VAR")
          .appendField("=");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#35bdb2');
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    Blockly.Blocks['business_logic_function'] = {
      init: function() {
        this.appendDummyInput()
          .appendField(new FunctionLabelField(), "FUNC");
        this.setColour('#2c985e');
        this.setTooltip('');
        this.setHelpUrl('');

        this.environment = that.environment;
      },
      mutationToDom: function(){
        this.addARGfields();

        let func_name = this.getFieldValue('FUNC');

        let container = document.createElement('mutation');
        container.setAttribute('args', this.getFieldValue('FUNC') == func_name );
        return container;
      },

      domToMutation: function(xmlElement) {
        this.addARGfields();
      },

      addARGfields: function() {
        let func_name = this.getFieldValue('FUNC');

        let func = this.environment.getFunction(func_name);

        if(func){
          let args = func.args;
          let isReturnedValue = func.is_returns_value;

          if(args){
            for(let i = 0; i < args.length; i++){

              if(!this.getInput("ARG"+i)){
                this.appendValueInput("ARG"+i)
                  .setCheck(null)
                  .setAlign(Blockly.ALIGN_RIGHT)
                  .appendField(args[i].getName(), "ARG");
              }

            }
          }

          if(!isReturnedValue){
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
          }else{
            this.setOutput(true, null);
          }

          this.setTooltip(func.description);
        }


      }
    };

    Blockly.Blocks['business_logic_date'] = {
      init: function() {
        this.appendDummyInput()
          // .appendField('date:');
        .appendField(new Blockly.FieldDate('2015-02-05'), 'DATE');
        this.setOutput(true, null);
        this.setColour('#0078d7');
      }
    };

  }

  test(){
    return "This is BlocksService!";
  }
}
