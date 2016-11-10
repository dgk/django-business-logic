import { Injectable } from '@angular/core';

import * as find from "lodash/find";
import { ReferenceService } from "../services/reference.service";
import {RestService} from "../services/rest.service";
import {ArgumentFieldService} from "../services/argumentField.service";
import {LabelField} from "./fields/label_field";
import {DropdownField} from "./fields/dropdown_field";
import {ArgumentField} from "./fields/argument_field";

@Injectable()
export class BlocksService {
  constructor(public refService: ReferenceService, public argField: ArgumentFieldService){
  }

  getRefService(){
    return this.refService;
  }

  getArgumentFieldService(){
    return this.argField;
  }

  init(){
    let that = this;
    Blockly.Blocks['business_logic_reference'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new LabelField(that.getRefService()), 'TYPE')
          .appendField(new DropdownField(that.getRefService()), "VALUE");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    Blockly.Blocks['business_logic_argument_field_get'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new ArgumentField("item", that.getArgumentFieldService()), "VAR");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    //attention: this is crutch!
    let msg = Blockly.Msg.VARIABLES_SET.substr(0, Blockly.Msg.VARIABLES_SET.indexOf('%') );

    Blockly.Blocks['business_logic_argument_field_set'] = {
      init: function () {
        this.appendValueInput("VAR")
          .setCheck(null)
          .appendField(msg)
          .appendField(new ArgumentField("item", that.getArgumentFieldService()), "VAR")
          .appendField("=");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

  }

  test(){
    return "This is BlocksService!";
  }
}
