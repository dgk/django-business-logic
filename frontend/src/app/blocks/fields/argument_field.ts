import {ArgumentFieldService} from "../../services/argumentField.service";

export class ArgumentField extends Blockly.FieldDropdown{

  argField: ArgumentFieldService;

  menuGenerator_ = () => {
    return this.argField.getFieldList();
  };

  constructor(text: string, argField: ArgumentFieldService){
    super([['', '']]);
    this.argField = argField;
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

    if(this.argField){
       this.setText( this.argField.getVerboseNameForField(newValue) );
    }

  }

  getValue(){
    return this.value_;
  }

}
