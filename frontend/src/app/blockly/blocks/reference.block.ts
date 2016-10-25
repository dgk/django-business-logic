Blockly.Blocks['business_logic_reference'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabel(''), 'REFERENCE_TYPE')
      // .appendField(new Blockly.FieldDropdown([["spb", "1"], ["msk", "2"]]), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
