import {stateService} from "../../services/state.service";
import find = require("lodash/find");
import {isNullOrUndefined} from "util";

export class ArgumentField extends Blockly.FieldDropdown{
  state: stateService;

  menuGenerator_ = () => {
    let args = this.state.getArguments();
    let options = [];

    args.forEach( (arg) => {
      let arg_name = arg["name"];
      arg.fields.forEach((field) => {
        options.push([field["verbose_name"], arg_name + '.' + field["name"]]);
      });
    });

    return options;
  };

  constructor(text: string, _state: stateService){
    super([['', '']]);
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
      let args = this.state.getArguments();

      if(args){
        let ind: number = this.getValue().indexOf(".");
        let arg_name: string = this.getValue().substr(0, ind);
        let field_name: string = this.getValue().substr(ind+1, this.getValue().length);

        let arg: any = find(args, (arg) => {return arg["name"] == arg_name;});

        let result: any = find(arg.fields, (field) => {return field["name"] == field_name});

        this.setText( result["verbose_name"] );
      }

    }


  }

  getValue(){
    return this.value_;
  }

}
