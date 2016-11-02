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
import { BackendService } from "../../backend.service";
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
    <!--<md-list>-->
      <!--<md-list-item>-->
        <!--<span>Save current version of program?</span>-->
        <!--<button md-raised-button class="md-primary" (click)="onSave()">Save</button>-->
      <!--</md-list-item>-->
    <!--</md-list>-->
    
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
  private workspace;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private blocks: BlocksService,
    private base: BaseService,
    private ref: ReferenceService){
  }


  ngAfterViewInit() {
    this.blocks.init();

    this.route.params.subscribe(params => {

      this.base.fetchVersion( +params["interfaceID"], +params["programID"], +params["versionID"] ).subscribe((data) => {

        this.version = data;
        console.log(data);
        this.createWorkspace();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
        this.params["Version"] = this.base.versions.getCurrent().getTitle();
      });

    });

    // let toolbox = `<xml>${require('./blockly-toolset.html')}</xml>`;
    // this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
    //   {
    //     toolbox: toolbox,
    //     trashcan: false,
    //     sounds: false,
    //     media: "./blockly/"
    //   });
    //
    // this.route.params.subscribe((params: Params) => {
    //   this.params = params;
    //
    //   this.backend.getProgramVersionById(+params['versionID']).subscribe((envelope) => {
    //     this.version = envelope;
    //
    //     let xml = Blockly.Xml.textToDom(envelope["xml"]);
    //     Blockly.Xml.domToWorkspace(xml, this.workspace);
    //   });
    //
    //
    //   let xml1 = `<xml>
    //                 <block type="business_logic_reference">
    //                   <field name="TYPE">books.Book</field>
    //                   <field name="VALUE">1</field>
    //                 </block>
    //            </xml>`;
    //   Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml1), this.workspace);
    //
    // });

  }

  createWorkspace(){
    // this.backend.getReferenceDescriptors().subscribe((data) => {
    //   console.log(data);
    // });

    this.ref.fetchReferenceDescriptors().subscribe(() => {
      console.log( this.ref.references.getCollection() );
      let xml = this.ref.generateXmlForToolbox();

      let toolbox = `<xml>${require('./blockly-toolset.html')}${xml}</xml>`;
      this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
        {
          toolbox: toolbox,
          trashcan: false,
          sounds: false,
          media: "./blockly/"
        });
    });
  }


  ngOnChanges(changes: any): any {
    // if (changes.xml && this.workspace) {
    //   this.initXml(changes.xml.currentValue);
    // }
  }

  onSave() {
    let xml = Blockly.Xml.workspaceToDom(this.workspace, false);
    let xmlText = Blockly.Xml.domToText(xml);

    console.log(xmlText);
    // this.version.xml = xmlText;
    // this.backend.saveVersion(this.version).subscribe(()=>{console.log("Saving!");});
  }

  private initXml(xmlText) {
    // this.workspace.clear();
    // let xml = Blockly.Xml.textToDom(xmlText);
    // Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
