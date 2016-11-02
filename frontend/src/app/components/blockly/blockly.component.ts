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
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { BlocksService } from "./blocks/blocks.service";
import { BaseService } from "../../services/base.service";
import {ReferenceService} from "../../services/reference.service";
// import "./blocks/reference.block";

@Component({
  selector: 'blockly',
  template: `
    <breadcrumb [params]="params"></breadcrumb>
    
    <section>
      <md-toolbar>
        <span>Save current version of program?</span>
        &nbsp;
        <span flex></span>
        <button md-raised-button class="md-primary" (click)="onSave()">Save</button>
      </md-toolbar>
    </section>
    
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: []
})

export class BlocklyComponent {
  private version: any;
  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  style = {
    width: '80%',
    height: '80%',
    position: 'absolute'
  };

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;
  //@ViewChild('toolbox') toolbox;
  // @Output() save = new EventEmitter();
  private workspace: Blockly.Workspace;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocks: BlocksService,
    private base: BaseService,
    private ref: ReferenceService){
  }


  ngAfterViewInit() {
    this.blocks.init();

    this.route.params.subscribe(params => {

      this.base.fetchVersion( +params["interfaceID"], +params["programID"], +params["versionID"] ).subscribe((data) => {

        this.version = data;
        this.createWorkspace();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
        this.params["Version"] = this.base.versions.getCurrent().getTitle();
      });

    });

  }

  createWorkspace(){

    this.ref.fetchReferenceDescriptors().subscribe(() => {

      let xml = this.ref.generateXmlForToolbox();

      let toolbox = `<xml>${require('./blockly-toolset.html')}${xml}</xml>`;
      this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
        {
          toolbox: toolbox,
          trashcan: false,
          sounds: false,
          media: "./blockly/"
        });

      this.addVersionXml();
    });
  }

  addVersionXml(){
    let xml = Blockly.Xml.textToDom(this.version["xml"]);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }


  ngOnChanges(changes: any): any {
    if (changes.xml && this.workspace) {
      this.initXml(changes.xml.currentValue);
    }
  }

  onSave() {
    let xml = Blockly.Xml.workspaceToDom(this.workspace, false);
    let xmlText = Blockly.Xml.domToText(xml);
    this.version.xml = xmlText;
    this.ref.saveVersion(this.version).subscribe(() => {
      console.log("Saving!!");
    });
  }

  private initXml(xmlText) {
    this.workspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
