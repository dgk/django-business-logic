import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import {Store, State} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import {Observable} from "rxjs";
import {isNullOrUndefined} from "util";
import * as find from "lodash/find";
import {stateService} from "../../services/state.service";
import {BlocksService} from "../../blocks/blocks.service";
import {xmlGenerator} from "../../services/xmlGenerator.service";

@Component({
  selector: 'blockly',
  template: `
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: []
})

export class BlocklyComponent {
  private loading: any;

  private version: any;

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;

  style = {
    width: '100%',
    height: '90%',
    position: 'absolute',
    padding: '5px 10px 0 10px'
  };

  private workspace: Blockly.Workspace;

  constructor(
    private store: Store<fromRoot.State>,
    private _stateService: stateService,
    private blocksService: BlocksService,
    private _xmlGenerator: xmlGenerator
  ){

    this.blocksService.init();
    this.loading = this.store.let(fromRoot.getInfoState);

    this.loading.subscribe(info => {
      if(info.loaded && info.step == "Editor"){

        let state = _stateService.getState();

        if(state["versions"].currentID == 'tmp'){
          this.version = state["versions"].details["tmp"];
        }else{
          this.version = find(state["versions"].details, version => {
            return version["id"] == state["versions"].currentID;
          });
        }

        if(isNullOrUndefined(this.workspace)) this.createWorkspace();

        this.loadVersionXml();

      }
    });
  }


  ngOnViewInit() {

  }

  createWorkspace(){

    let toolbox = `<xml>
                      ${require('./blockly-toolset.html')}
                      ${this._xmlGenerator.forReferences(this._stateService.getState()["references"])}
                      ${this._xmlGenerator.forArguments(this._stateService.getArguments())}
                      ${this._xmlGenerator.forFunctions()}
                   </xml>`;
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      {
        toolbox: toolbox,
        trashcan: true,
        sounds: false,
        media: "./blockly/",
        zoom:
          {controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2}
      });

    this.workspace.addChangeListener(event => {
      // console.log(event);
    });
  }

  loadVersionXml(){
    this.workspace.clear();

    let xml = Blockly.Xml.textToDom(this.version["xml"]);

    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }


  ngOnChanges(changes: any): any {

  }

  getXml(){
    return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(this.workspace, false) );
  }

  clearWorkspace(){
    if(!isNullOrUndefined(this.workspace)) Blockly.mainWorkspace.clear();
    if(isNullOrUndefined(this.workspace)) this.createWorkspace();
  }

  initXml(xmlText) {
    // this.workspace.clear();
    this.clearWorkspace();

    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
