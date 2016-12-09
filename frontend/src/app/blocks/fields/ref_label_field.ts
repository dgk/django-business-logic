import {stateService} from "../../services/state.service";
import find = require("lodash/find");

export class ReferenceLabelField extends Blockly.FieldLabel {
  state: stateService;

  EDITABLE = true;

  constructor(_state: stateService){
    super('');
    this.state = _state;
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

    if(this.state){
      let references = this.state.getState()["references"].entities;
      let ref = find(references, ref => {
        return ref["name"] == this.getValue();
      });

      this.setText(ref["verbose_name"]);

      //TODO: set Tooltip
      // this.setTooltip(" ["+this.getValue()+"]");
    }else{
      this.setText(this.getValue());
    }
  }

  getValue(){
    return this.value_;
  }
}
