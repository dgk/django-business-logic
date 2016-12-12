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


@Component({
  selector: 'blockly-readonly',
  template: `
    
    <div class="ui message">
      <div class="header">
        Log info
      </div>
      <p>Interface : <i>{{information.prInterface || ''}}</i> | Program: <i>{{information.program || ''}}</i> | Version: <i>{{information.version || ''}}</i></p>
    </div>

    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    
    <help-card [current_value]="currentValue" [previous_value]="previousValue" *ngIf="helpcardShow"></help-card>
    `,
  providers: []
})

export class BlocklyReadOnlyComponent {
  private blocks: any;

  private loading: any;

  private version: any;

  private helpcardShow: boolean = false;

  previousValue: any;
  currentValue: any;

  information = {
    prInterface: '',
    program: '',
    version: ''
  };

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
    private blocksService: BlocksService
  ){

    this.blocksService.init();
    this.loading = this.store.let(fromRoot.getInfoState);

    this.loading.subscribe(info => {

      if(info.loaded && info.step == "ReadonlyEditor"){

        let state = _stateService.getState();

        this.version = find(state["versions"].details, version => {
          return version["id"] == state["versions"].currentID;
        });

        this.information.prInterface = _stateService.getCurrentPrInterface().title;
        this.information.program = _stateService.getCurrentProgram().title;
        this.information.version = _stateService.getCurrentVersion().title;

        if(isNullOrUndefined(this.workspace)) this.createWorkspaceReadonly();

        this.loadVersionXml();
        this.highlightActiveBlocks();


      }
    });
  }


  createWorkspaceReadonly(){

    let toolbox = `<xml></xml>`;
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      {
        toolbox: false,
        trashcan: false,
        sounds: false,
        media: "./blockly/",
        readOnly: false,
        scrollbars: true
      });

    this.workspace.addChangeListener(event => {
        if(event["element"] == 'selected'){
          let block_id = event.newValue;
          let bl = find(this.blocks, block => {
            return block["id"] == block_id;
          });

          if(Blockly.selected != null){
            this.helpcardShow = true;
            this.previousValue = bl["previous_value"];
            this.currentValue = bl["current_value"];
          }else{
            this.helpcardShow = false;
          }


        }
    });
  }

  highlightActiveBlocks(){
    let state = this._stateService.getState();

    let executions = state["executions"];
    this.blocks = [];

    let log = executions["logs"][executions.currentID];

    this.bypassTree([ log ]);

    let all_blocks = this.workspace.getAllBlocks();

    all_blocks.forEach(block => {
      // disable dragging
      block["onMouseMove_"] = () => {};

      let block_log = find(this.blocks, item => {return item["id"] == +block["id"]});

      if(isNullOrUndefined(block_log)){
        block.setDisabled(true);
        block.setShadow(true);
      }else{
        // block.setTooltip(`Previous value : ${block_log.previous_value}\n Current value : ${block_log.current_value}`);
      }
    });
  }

  bypassTree(nodes){
    nodes.forEach(node => {
      this.blocks.push({
        exception: node["exception"],
        previous_value: node["previous_value"],
        current_value: node["current_value"],
        id: node["node"]
      });
      if(node["children"].length != 0) this.bypassTree(node["children"]);
    });
  }

  loadVersionXml(){
    // this.workspace.clear();
    Blockly.mainWorkspace.clear();

    let xml = Blockly.Xml.textToDom(this.version["xml"]);

    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }

}
