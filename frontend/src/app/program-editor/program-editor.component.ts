/**
 * Created by Infirex on 5/27/2016.
 */

import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';
import {BackendService} from  '../backend.service';

@Component({
  selector: 'program-editor',
  template: `
  programVersionId = {{programVersionId}}
  
  <xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_repeat_ext"></block>
  <block type="logic_compare"></block>
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  <block type="text"></block>
  <block type="text_print"></block>
</xml>
  <div style="width:1200px;height:800px;" id="blocklyDiv">
    
  </div>
  `
})
export class ProgramEditorComponent {
  public programVersionId;
  private workspace;

  constructor(private router: Router,
              private backend: BackendService,
              private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.workspace = Blockly.inject('blocklyDiv',
      {
        toolbox: document.getElementById('toolbox'),
        trashcan: true,
        sounds: false
      });
    this.programVersionId = Number.parseInt(this.routeParams.get('programVersionId'));
    this.backend.getProgramVersionById(this.programVersionId)
      .subscribe(version => this.initProgram(version));
  }

  private initProgram(version) {
    let xml = Blockly.Xml.textToDom(version.xml);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
