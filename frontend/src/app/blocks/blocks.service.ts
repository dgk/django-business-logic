import { Injectable } from '@angular/core';

import * as find from "lodash/find";
import { ReferenceService } from "../services/reference.service";
import {ArgumentFieldGet} from "./fields/argument_field_get";
import {RestService} from "../services/rest.service";
import {ArgumentFieldService} from "../services/argumentField.service";
import {LabelField} from "./fields/label_field";
import {DropdownField} from "./fields/dropdown_field";

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

    Blockly.Blocks['business_logic_argument_get'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new ArgumentFieldGet("item", that.getArgumentFieldService()), "NAME");
        this.setOutput(true, null);
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
