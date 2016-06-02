/**
 * Created by Infirex on 6/1/2016.
 */
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

@Component({
  selector: 'blockly',
  template: `
<xml #toolbox style="display: none">
${require('./blockly-toolset.html')}
</xml>
<button (click)="onSave()">
  Save
</button>
<div #blockly [ngStyle]="style"></div>
`
})
export default class BlocklyComponent implements AfterViewInit, OnChanges {
  style = {
    width: '100%',
    height: '900px'
  };

  @ViewChild('blockly') blocklyDiv;
  @ViewChild('toolbox') toolbox;
  @Input() xml;
  @Output() save = new EventEmitter();
  private workspace;


  ngAfterViewInit() {
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      {
        toolbox: this.toolbox.nativeElement,
        trashcan: true,
        sounds: false
      });
    this.initXml(this.xml);
  }


  ngOnChanges(changes: any): any {
    if (changes.xml && this.workspace) {
      this.initXml(changes.xml.currentValue);
    }
  }

  onSave() {
    this.save.emit(this.getBlocklyXml());
  }

  private getBlocklyXml(): string {
    let xml = Blockly.Xml.workspaceToDom(this.workspace);
    let xmlText = Blockly.Xml.domToText(xml);
    return xmlText;
  }

  private initXml(xmlText) {
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
