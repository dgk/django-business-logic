import { Injectable } from '@angular/core';
import { BackendService } from "../../backend.service";

import _ from "lodash";

@Injectable()
export class BlocksService {
  constructor(private backend: BackendService){
  }

  getBackend(){
    return this.backend;
  }

  getLabel(): any{
    let label = new Blockly.FieldLabel('');

    label.setValue = (newValue: string) => {
      if (newValue === null || newValue === label.value_) {
        return;  // No change if null.
      }
      if (label.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
          label.sourceBlock_, 'field', label.name, label.value_, newValue));
      }
      label.value_ = newValue;

      this.backend.getReferenceDescriptors().subscribe(
        (data) => {
          //let result = _.find(data, function(reference) { return reference["name"] == label.getValue(); });
          let result = {
            "verbose_name": "not found",
            "name": "not found"
          };
          for(let i = 0; i < data.length; i++){
            if(data[i]["name"] == label.getValue())
              result = data[i];
          }

          label.setText(result["verbose_name"]+"["+result["name"]+"]");

        }
      );
    };


    label.getValue = () => {
      return label.value_;
    };

    label.EDITABLE = true;

    return label;
  }

  init(){
    let that = this;
    Blockly.Blocks['business_logic_reference'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(that.getLabel(), 'TYPE');
        // .appendField(new Blockly.FieldDropdown([["spb", "1"], ["msk", "2"]]), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      },
      backend: that.getBackend()
    };
  }
}
