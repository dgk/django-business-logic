import {Injectable} from '@angular/core';

import * as find from "lodash/find";
import {ReferenceService} from "../services/reference.service";
import {RestService} from "../services/rest.service";
import {ArgumentFieldService} from "../services/argumentField.service";
import {ReferenceLabelField} from "./fields/ref_label_field";
import {ReferenceDropdownField} from "./fields/ref_dropdown_field";
import {ArgumentField} from "./fields/argument_field";
// import {MockService} from "../../tests/mock.service";
import {FunctionLabelField} from "./fields/func_label_field";
import {EnvironmentService} from "../services/environment.service";

import {block_reference, block_function, block_field_get, block_field_set, block_date} from "./consts/blockTypes";
import {stateService} from "../services/state.service";
import {FetchService} from "../services/fetch.service";

@Injectable()
export class BlocksService {
  constructor(public refService: ReferenceService,
              public argField: ArgumentFieldService,
              public environment: EnvironmentService,
              public _state: stateService,
              public _fetch: FetchService) {
  }

  init() {
    let that = this;
    Blockly.Blocks[block_reference.title] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new ReferenceLabelField(that._state), 'TYPE')
          .appendField(new ReferenceDropdownField(that._state, that._fetch), "VALUE");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(block_reference.color);
        this.setTooltip('');
      }
    };

    // Blockly.Blocks[block_field_get.title] = {
    //   init: function () {
    //     this.appendDummyInput()
    //       .appendField(new ArgumentField('', that.argField), "VAR");
    //     this.setOutput(true, null);
    //     this.setColour(block_field_get.color);
    //     this.setTooltip('');
    //   }
    // };

    // //TODO: attention: this is crutch!
    // let msg = Blockly.Msg.VARIABLES_SET.substr(0, Blockly.Msg.VARIABLES_SET.indexOf('%'));
    //
    // Blockly.Blocks[block_field_set.title] = {
    //   init: function () {
    //     this.appendValueInput("VALUE")
    //       .setCheck(null)
    //       .appendField(msg)
    //       .appendField(new ArgumentField('', that.argField), "VAR")
    //       .appendField("=");
    //     this.setPreviousStatement(true, null);
    //     this.setNextStatement(true, null);
    //     this.setColour(block_field_set.color);
    //     this.setTooltip('');
    //   }
    // };
    //
    // Blockly.Blocks[block_function.title] = {
    //   init: function () {
    //     this.appendDummyInput()
    //       .setAlign(Blockly.ALIGN_RIGHT)
    //       .appendField(new FunctionLabelField(), "FUNC");
    //     this.setColour(block_function.color);
    //     this.setTooltip('');
    //     this.setHelpUrl('');
    //
    //     this.environment = that.environment;
    //
    //     this.addARGfields = function (alternate_func_name?: string) {
    //       let func_name;
    //
    //       if (alternate_func_name) {
    //         func_name = alternate_func_name;
    //       } else {
    //         func_name = this.getFieldValue('FUNC');
    //       }
    //
    //       let func = this.environment.getFunction(func_name);
    //
    //       if (func) {
    //         let args = func.args;
    //         let isReturnedValue = func.is_returns_value;
    //
    //         if (args) {
    //           for (let i = 0; i < args.length; i++) {
    //
    //             // if(!this.getInput("ARG"+i) && args[i]["choices"].length != 0){
    //             //   this.appendDummyInput("ARG"+i)
    //             //     .setAlign(Blockly.ALIGN_RIGHT)
    //             //     .appendField(args[i].getName(), "ARG")
    //             //     .appendField(new Blockly.FieldDropdown( this.environment.getChoicesFor(func, args[i].getName()) ), "ARG"+i);
    //             // }
    //
    //             let argInput = this.getInput("ARG" + i);
    //
    //             if (!argInput) {
    //               this.appendValueInput("ARG" + i)
    //                 .setCheck(null)
    //                 .setAlign(Blockly.ALIGN_RIGHT)
    //                 .appendField(args[i].getName(), "ARG");
    //             }
    //
    //           }
    //         }
    //
    //         if (!isReturnedValue) {
    //           this.setPreviousStatement(true, null);
    //           this.setNextStatement(true, null);
    //         } else {
    //           this.setOutput(true, null);
    //         }
    //
    //         this.setTooltip(func.description);
    //       }
    //
    //
    //     };
    //
    //     this.mutationToDom = function () {
    //       this.addARGfields();
    //
    //       let func_name = this.getFieldValue('FUNC');
    //
    //       let container = document.createElement('mutation');
    //       container.setAttribute('args', (this.getFieldValue('FUNC') == func_name).toString());
    //       return container;
    //     };
    //
    //     this.domToMutation = function (xmlChild) {
    //       //TODO: find better way
    //       let alternate_func_name_node = find(xmlChild.parentNode.childNodes, (node: any) => {
    //         if (node.getAttribute) {
    //           return node.getAttribute('name') == 'FUNC';
    //         } else return false;
    //       });
    //
    //       this.addARGfields(alternate_func_name_node.textContent);
    //     };
    //   }
    // };

    Blockly.Blocks[block_date.title] = {
      init: function () {
        this.appendDummyInput()
        // .appendField('date:');
          .appendField(new Blockly.FieldDate(''), 'DATE');
        this.setOutput(true, null);
        this.setColour(block_date.color);
      }
    };

  }

  test() {
    return "This is BlocksService!";
  }
}
