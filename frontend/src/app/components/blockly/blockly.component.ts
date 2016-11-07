import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  Directive,
  AfterViewInit,
  OnChanges,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BlocksService } from "./blocks/blocks.service";
import { BaseService } from "../../services/base.service";
import {ReferenceService} from "../../services/reference.service";

@Component({
  selector: 'blockly',
  template: `
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: []
})

export class BlocklyComponent {

  @Input() version: any;
  @Input() xmlForReferenceDescriptors: any;

  style = {
    width: '100%',
    height: '95%',
    position: 'absolute'
  };

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;
  //@ViewChild('toolbox') toolbox;
  // @Output() xml = new EventEmitter();
  private workspace: Blockly.Workspace;

  constructor(){

  }


  ngAfterViewInit() {

  }

  createWorkspace(){

      let toolbox = `<xml>${require('./blockly-toolset.html')}${this.xmlForReferenceDescriptors}</xml>`;
      this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
        {
          toolbox: toolbox,
          trashcan: true,
          sounds: false,
          media: "./blockly/"
        });

      this.loadVersionXml();

  }

  loadVersionXml(){
    let xml = Blockly.Xml.textToDom(this.version["xml"]);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }


  ngOnChanges(changes: any): any {

    if(changes.version && changes.version.currentValue){

    }

    if(changes.xmlForReferenceDescriptors && changes.xmlForReferenceDescriptors.currentValue){
      this.createWorkspace();
    }

  }

  getXml(){
    return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(this.workspace, false) );
  }

  initXml(xmlText) {
    this.workspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
