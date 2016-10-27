import {Http, BaseRequestOptions, XHRBackend, CookieXSRFStrategy, BrowserXhr, BaseResponseOptions} from '@angular/http';

import 'rxjs/Rx';
import { BackendService } from "../../backend.service";

class ReferenceBlock {

  private backend: any = new BackendService(
    new Http(
      new XHRBackend(
        new BrowserXhr(), new BaseResponseOptions(), new CookieXSRFStrategy()),
      new BaseRequestOptions() )
  );

  constructor(){

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
          label.setText("Hello Fox!");
          console.log(label.getValue());


        }
      );
    };


    label.getValue = () => {
      return label.value_;
    };

    label.EDITABLE = true;

    return label;
  }
};

let ref = new ReferenceBlock();

Blockly.Blocks['business_logic_reference'] = {
  init: function(){
    this.appendDummyInput()
      .appendField(ref.getLabel(), 'REFERENCE_TYPE');
    // .appendField(new Blockly.FieldDropdown([["spb", "1"], ["msk", "2"]]), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  backend: ref.getBackend()
};

