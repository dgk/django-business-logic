import {stateService} from "../../services/state.service";
import {FetchService} from "../../services/fetch.service";
import find = require("lodash/find");

export class ReferenceDropdownField extends Blockly.FieldDropdown {
  state: stateService;
  fetch: FetchService;

  menuGenerator_ = () => {
    return this.options;
  };

  options: any = [];

  constructor(_state: stateService, _fetch: FetchService){
    super([ ['', ''] ]);
    this.state = _state;
    this.fetch = _fetch;
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
      let referenceName = this.sourceBlock_.inputList[0].fieldRow[0].getValue();

      this.fetch.loadReferenceDetail(referenceName).subscribe(() => {
        let ref = this.state.getState()["references"].details[referenceName];

        this.options = [];
        ref.results.forEach((opt) => {
          this.options.push([ ''+opt.name, ''+opt.id ]);
        });

        if(this.getValue() == '-1')
          return this.setText("Choose value");

        let options = this.getOptions_();

        for(let i = 0; i < options.length; i++){
          if(options[i][1] == newValue)
            return this.setText(options[i][0]);
        }

      });

    }

  }

  getValue(){
    return this.value_;
  }

}
