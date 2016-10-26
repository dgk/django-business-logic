import { _ } from 'lodash';

Blockly.Blocks['business_logic_reference'] = {
  init: function() {
    let label = new Blockly.FieldLabel('');

    // label.setAlias = (alias: string) => {
    //
    //   alias = String(alias);
    //
    //   let text = label.text_;
    //
    //   label.text_ = alias;
    //   label.updateTextNode_();
    //
    //   label.text_ = text;
    // };

    label.setValue = (newValue: string) => {
      if (newValue === null || newValue === label.value_) {
        return;  // No change if null.
      }
      if (label.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
          label.sourceBlock_, 'field', label.name, label.value_, newValue));
      }
      label.value_ = newValue;
      // service.getText(newValue).then((text) => {
      // label.setText(text);

      // })

    };

    label.getValue = () => {
      return label.value_;
    };

    // label.getText = () => {
    //   return "xxx";
    // };

    label.EDITABLE = true;

    this.appendDummyInput()
      .appendField(label, 'REFERENCE_TYPE');
      // .appendField(new Blockly.FieldDropdown([["spb", "1"], ["msk", "2"]]), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
