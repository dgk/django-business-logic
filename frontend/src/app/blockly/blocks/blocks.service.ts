import { Injectable } from '@angular/core';
import { BackendService } from "../../backend.service";

import _ from "lodash";

@Injectable()
export class BlocksService {
  constructor(public backend: BackendService){
  }

  getBackend(){
    return this.backend;
  }

  getLabel(): any{

    let that = this;

    class label extends Blockly.FieldLabel {
      constructor(){
        super('');
      }

      setValue(newValue: string){
          if (newValue === null || newValue === this.value_) {
            return;  // No change if null.
          }
          if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
            Blockly.Events.fire(new Blockly.Events.Change(
              this.sourceBlock_, 'field', this.name, this.value_, newValue));
          }
          this.value_ = newValue;

          this.setText("Hello Fox!");

          that.backend.getReferenceDescriptors().subscribe(
            (data) => {
              //let result = _.find(data, function(reference) { return reference["name"] == label.getValue(); });
              let result = {
                "verbose_name": "not found",
                "name": "not found"
              };
              for(let i = 0; i < data.length; i++){
                if(data[i]["name"] == this.getValue())
                  result = data[i];
              }

              this.setText(result["verbose_name"]+" ["+result["name"]+"]");

            }
          );
      }
    }

    // let label = new Blockly.FieldLabel('');
    //
    // label.setValue = (newValue: string) => {
    //   if (newValue === null || newValue === label.value_) {
    //     return;  // No change if null.
    //   }
    //   if (label.sourceBlock_ && Blockly.Events.isEnabled()) {
    //     Blockly.Events.fire(new Blockly.Events.Change(
    //       label.sourceBlock_, 'field', label.name, label.value_, newValue));
    //   }
    //   label.value_ = newValue;
    //
    //   this.backend.getReferenceDescriptors().subscribe(
    //     (data) => {
    //       //let result = _.find(data, function(reference) { return reference["name"] == label.getValue(); });
    //       let result = {
    //         "verbose_name": "not found",
    //         "name": "not found"
    //       };
    //       for(let i = 0; i < data.length; i++){
    //         if(data[i]["name"] == label.getValue())
    //           result = data[i];
    //       }
    //
    //       label.setText(result["verbose_name"]+" ["+result["name"]+"]");
    //
    //     }
    //   );
    // };


    // label.getValue = () => {
    //   return label.value_;
    // };
    //
    // label.EDITABLE = true;

    // return label;

    return new label();
  }

  getDropdown(){
    // let dropdown = new Blockly.FieldDropdown([ ["spb", "100"] ]);
    //
    // dropdown.getValue = () => {
    //   return dropdown.value_;
    // };
    //
    // dropdown.setValue = (newValue: string) => {
    //   if (newValue === null || newValue === dropdown.value_) {
    //     return;  // No change if null.
    //   }
    //   if (dropdown.sourceBlock_ && Blockly.Events.isEnabled()) {
    //     Blockly.Events.fire(new Blockly.Events.Change(
    //       dropdown.sourceBlock_, 'field', dropdown.name, dropdown.value_, newValue));
    //   }
    //   dropdown.value_ = newValue;
    //
    //   let referenceType = dropdown.sourceBlock_.inputList[0].fieldRow[0].getValue();
    //
    //   this.backend.getReferenceName(referenceType, newValue).subscribe(
    //     (data) => {
    //       dropdown.setText(data["name"]);
    //     }
    //   );
    // };
    //
    // return dropdown;
  }

  init(){
    let that = this;
    Blockly.Blocks['business_logic_reference'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(that.getLabel(), 'TYPE');
          // .appendField(that.getDropdown(), "VALUE");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('');
      },
      backend: that.getBackend()
    };
  }
}
