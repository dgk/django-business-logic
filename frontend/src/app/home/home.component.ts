import { Component, ViewChild, Input, Output } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

import {BackendService} from '../backend.service';
import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class Home {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, private backend: BackendService) {
    console.log(Blockly);

    backend.listProgramInterfaces().subscribe(
      envelope => console.log(envelope)
    );
  }

  // ngOnInit() {
  //   console.log('hello `Home` component');
  //   // this.title.getData().subscribe(data => this.data = data);
  // }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  @ViewChild('blockly') blocklyDiv;
  @ViewChild('toolbox') toolbox;
  @Input() xml;
  // @Output() save = new EventEmitter();
  private workspace;


  ngOnInit() {

    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    var toolbox = '<xml>';
    toolbox += '  <block type="controls_if"></block>';
    toolbox += '  <block type="controls_whileUntil"></block>';
    toolbox += '</xml>';
    var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});

    // this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
    //   {
    //     toolbox: this.toolbox.nativeElement,
    //     trashcan: true,
    //     sounds: false
    //   });
    // this.initXml(this.xml);
  }


  // ngOnChanges(changes: any): any {
  //   if (changes.xml && this.workspace) {
  //     this.initXml(changes.xml.currentValue);
  //   }
  // }
  //
  // onSave() {
  //   this.save.emit(this.getBlocklyXml());
  // }

  private getBlocklyXml(): string {
    let xml1 = Blockly.Xml.workspaceToDom(this.workspace);
    let xmlText = Blockly.Xml.domToText(xml1);
    return xmlText;
  }

  private initXml(xmlText) {
    this.workspace.clear();
    let xml1 = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml1, this.workspace);
  }

}

