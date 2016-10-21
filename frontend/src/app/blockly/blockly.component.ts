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
    `
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
    private router: Router){

  }


  ngAfterViewInit() {
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

        var xml = Blockly.Xml.textToDom(envelope["xml"]);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
      });
    });

    // this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
    //   {
    //     toolbox: this.toolbox.nativeElement,
    //     trashcan: true,
    //     sounds: false
    //   });
    // this.initXml(this.xml);
  }


  ngOnChanges(changes: any): any {
    // if (changes.xml && this.workspace) {
    //   this.initXml(changes.xml.currentValue);
    // }
  }

  onSave() {
    let xml = Blockly.Xml.workspaceToDom(this.workspace);
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
