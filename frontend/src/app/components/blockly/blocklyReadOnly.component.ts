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
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: []
})

export class BlocklyReadOnlyComponent {
  private blocks: any;

  private loading: any;

  private version: Observable<any>;

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
    private blocks: BlocksService
  ){

    this.blocks.init();
    this.loading = this.store.let(fromRoot.getInfoState);

    this.loading.subscribe(info => {

      if(info.loaded && info.step == "ReadonlyEditor"){

        let state = _stateService.getState();

        this.version = find(state["versions"].details, version => {
          return version["id"] == state["versions"].currentID;
        });

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
        toolbox: toolbox,
        trashcan: true,
        sounds: false,
        media: "./blockly/",
        readOnly: true,
        scrollbars: true
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
      let block_log = find(this.blocks, item => {return item.id == +block.id });

      if(isNullOrUndefined(block_log)){
        block.setDisabled(true);
        block.setShadow(true);
      }else{
        block.setTooltip(`Previous value : ${block_log.previous_value}\n Current value : ${block_log.current_value}`);
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
    this.workspace.clear();

    let xml = Blockly.Xml.textToDom(this.version["xml"]);

    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }

}
