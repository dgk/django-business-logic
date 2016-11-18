import {ReferenceService} from "../../services/reference.service";

export class ReferenceDropdownField extends Blockly.FieldDropdown {
  refService: ReferenceService;

  menuGenerator_ = () => {
    return this.options;
  };

  options: any = [];

  constructor(ref: ReferenceService){
    super([ ['', ''] ]);
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

    if(this.sourceBlock_ != null){
      let referenceType = this.sourceBlock_.inputList[0].fieldRow[0].getValue();

      this.refService.getAllResultsForReferenceDescriptor(referenceType).subscribe(
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

}
