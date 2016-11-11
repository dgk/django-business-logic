import {ReferenceService} from "../../services/reference.service";

export class LabelField extends Blockly.FieldLabel {
  refService: ReferenceService;

  EDITABLE = true;

  constructor(ref: ReferenceService){
    super('');
    this.refService = ref;
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

    if(this.refService){
      let verbose_name = this.refService.getVerboseName(this.getValue());
      this.setText(verbose_name);

      //TODO: set Tooltip
      // this.setTooltip(" ["+this.getValue()+"]");
    }
  }

  getValue(){
    return this.value_;
  }
}
