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

    class Label extends Blockly.FieldLabel {
      EDITABLE = true;

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

          that.backend.getReferenceDescriptors().subscribe(
            (data) => {

              // console.log(data);
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

      getValue(){
        return this.value_;
      }
    }

    return new Label();
  }

  getDropdown(): any{
    let that = this;

    class Dropdown extends Blockly.FieldDropdown {
      constructor(){
        super([ ["spb", "100"] ]);
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

          if(this.sourceBlock_ != null){
            let referenceType = this.sourceBlock_.inputList[0].fieldRow[0].getValue();
            that.backend.getReferenceName(referenceType, newValue).subscribe(
              (data) => {
                this.setText(data["name"]);
              }
            );
          }

      }

      getValue(){
        return this.value_;
      }
    }

    return new Dropdown();
  }

  init(){
    let that = this;
    Blockly.Blocks['business_logic_reference'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(that.getLabel(), 'TYPE')
          .appendField(that.getDropdown(), "VALUE");
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
