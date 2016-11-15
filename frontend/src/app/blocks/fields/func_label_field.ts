export class FunctionLabelField extends Blockly.FieldLabel {

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

    this.setText(this.getValue());

  }

  getValue(){
    return this.value_;
  }
}
