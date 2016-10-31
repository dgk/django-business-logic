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
import { BackendService } from '../backend.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { BlocksService } from "./blocks/blocks.service";
// import "./blocks/reference.block";

@Component({
  selector: 'blockly',
  template: `
    <breadcrumb [params]="params"></breadcrumb>
    <md-list>
      <md-list-item>
        <button md-raised-button class="md-primary" (click)="onSave()">Save</button>
      </md-list-item>
    </md-list>
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: [ BackendService, BlocksService ]
})

export class BlocklyComponent {
  private version: any;
  private params: any;

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
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private blocks: BlocksService){
  }


  ngAfterViewInit() {
    this.blocks.init();

    let toolbox = `<xml>${require('./blockly-toolset.html')}</xml>`;
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      {
        toolbox: toolbox,
        trashcan: false,
        sounds: false,
        media: "./blockly/"
      });

    this.route.params.subscribe((params: Params) => {
      this.params = params;

      this.backend.getProgramVersionById(+params['versionID']).subscribe((envelope) => {
        this.version = envelope;

        let xml = Blockly.Xml.textToDom(envelope["xml"]);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
      });


      let xml1 = `<xml>
                    <block type="business_logic_reference">
                      <field name="TYPE">books.Book</field>
                      <field name="VALUE">1</field>
                    </block>
               </xml>`;
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml1), this.workspace);

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
    this.version.xml = xmlText;
    this.backend.saveVersion(this.version).subscribe(()=>{console.log("Saving!");});
  }

  private initXml(xmlText) {
    this.workspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
