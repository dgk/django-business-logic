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

@Component({
  selector: 'blockly',
  template: `
     <div #blocklyArea></div>   
     <div #blocklyDiv [ngStyle]="style"></div>
    `
})

export class BlocklyComponent {

  style = {
    width: '100%',
    height: '800px',
    position: 'absolute'
  };

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;
  //@ViewChild('toolbox') toolbox;
  @Input() xml;
  @Output() save = new EventEmitter();
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
        sounds: false
      });

    this.route.params.subscribe((params: Params) => {
      this.backend.getProgramVersionById(+params['versionID']).subscribe((envelope) => {
        console.log(envelope);

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
    // this.save.emit(this.getBlocklyXml());
  }

  private getBlocklyXml(): string {
    let xml = Blockly.Xml.workspaceToDom(this.workspace);
    let xmlText = Blockly.Xml.domToText(xml);
    return xmlText;
  }

  private initXml(xmlText) {
    this.workspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
