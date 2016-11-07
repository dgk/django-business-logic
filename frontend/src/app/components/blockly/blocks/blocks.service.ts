import { Injectable } from '@angular/core';

import * as find from "lodash/find";
import { ReferenceService } from "../../../services/reference.service";

@Injectable()
export class BlocksService {
  constructor(public backend: ReferenceService){
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

          that.backend.fetchReferenceDescriptors().subscribe(
            () => {

              let result = find( that.backend.references.getCollection(), (model: any) => {
                return model.name == this.getValue();
              });

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
      menuGenerator_: Function;

      options: any = [];

      constructor(){
        super([ ["123", "100"] ]);
        this.menuGenerator_ = this.menuGenerator;
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

            that.backend.getAllResultsForReferenceDescriptor(referenceType).subscribe(
              (data) => {
                this.options = [];
                data.results.forEach((opt) => {
                  this.options.push([ ''+opt.name, ''+opt.id ]);
                });

                if(this.getValue() == '-1')
                  return this.setText("Choose value");

                let options = this.getOptions_();

                for(let i = 0; i < options.length; i++){
                  if(options[i][1] == newValue)
                    return this.setText(options[i][0]);
                }

              }
            );

          }

      }

      getValue(){
        return this.value_;
      }

      menuGenerator(){
        return this.options;
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
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
      },
      backend: that.getBackend()
    };

    Blockly.Blocks['business_logic_variable'] = {
      init: function(){
        this.appendDummyInput()
          .appendField(new Blockly.FieldLabel('var'));
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
  }
}
