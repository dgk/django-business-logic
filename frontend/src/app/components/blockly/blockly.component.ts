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

  private version: Observable<any>;
  private references: Observable<any>;

  // @Input() version: any;
  // @Input() xmlForReferenceDescriptors: any;
  // @Input() xmlForArgumentFields: any;
  // @Input() xmlForFunctionLibs: any;

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;

  style = {
    width: '100%',
    height: '90%',
    position: 'absolute'
  };

  private workspace: Blockly.Workspace;

  constructor(
    private store: Store<fromRoot.State>,
    private _stateService: stateService,
    private blocks: BlocksService,
    private _xmlGenerator: xmlGenerator
  ){
    this.blocks.init();
    this.loading = this.store.let(fromRoot.getInfoState);

    this.loading.subscribe(info => {
      if(info.loaded && info.step == "Editor"){

        let state = _stateService.getState();

        this.version = find(state["versions"].details, version => {
          return version["id"] == state["versions"].currentID;
        });

        this.createWorkspace();

      }

      if(info.loaded && info.step == "ReadonlyEditor"){

        let state = _stateService.getState();

        this.version = find(state["versions"].details, version => {
          return version["id"] == state["versions"].currentID;
        });

        this.createWorkspaceReadonly();

      }
    });
  }


  ngOnViewInit() {

  }

  // ${this.xmlForReferenceDescriptors}
  // ${this.xmlForArgumentFields}
  // ${this.xmlForFunctionLibs}

  createWorkspace(){
      if(!isNullOrUndefined(this.workspace)) this.workspace.clear();

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
          media: "./blockly/"
        });

      this.loadVersionXml();

  }

  createWorkspaceReadonly(){
      if(!isNullOrUndefined(this.workspace)) this.workspace.clear();

      let toolbox = `<xml></xml>`;
      this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
        {
          toolbox: toolbox,
          trashcan: true,
          sounds: false,
          media: "./blockly/",
          readOnly: true,
          scrollbars: true
        });

      this.loadVersionXml();
  }

  loadVersionXml(){
    let xml = Blockly.Xml.textToDom(this.version["xml"]);

    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }


  ngOnChanges(changes: any): any {

    if(changes.version && changes.version.currentValue){
      // this.createWorkspace();
    }

    // if(this.xmlForReferenceDescriptors && this.xmlForArgumentFields){
    //   this.createWorkspace();
    // }

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
