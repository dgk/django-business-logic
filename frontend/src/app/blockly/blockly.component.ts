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
<div [ngStyle]="styleBlockly">
       Blockly component!
    <!--<button style="position: absolute; top: 0; right: 100px;">Save</button>-->
    <div #blockly [ngStyle]="style"></div>
    <button (click)="onSave()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" [ngStyle]="styleButton">
        <i class="material-icons">save</i>
    </button>
</div>
`
})

export class BlocklyComponent {
    style = {
        width: '100%',
        height: '800px',
    };
    styleBlockly = {
        width: '100%',
        position: 'relative'
    };
    styleButton = {
        position: 'absolute',
        top: '10px',
        right: '60px',
    };


  @ViewChild('blockly') blocklyDiv;
  @ViewChild('toolbox') toolbox;
  @Input() xml;
  @Output() save = new EventEmitter();
  private workspace;

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router){

  }


  ngAfterViewInit() {
    this.route.params.subscribe((params: Params) => {
      this.backend.getProgramVersionById(+params['versionID']).subscribe((envelope) => {
        console.log(envelope);
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
