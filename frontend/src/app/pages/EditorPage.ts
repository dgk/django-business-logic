import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import * as actions from '../actions/referenceList';
import * as actionsInfo from '../actions/info';
import * as actionsVersion from '../actions/versionList';
import * as actionsProgram from '../actions/programList';
import * as actionsInterface from '../actions/prInterfaceList';
import {stateService} from "../services/state.service";
import {PostService} from "../services/post.service";

@Component({
  selector: 'editor-page',
  template: `
            <div class="ui section">
                <button class="ui icon violet button" (click) = "modalSave.show()"><i class="save icon"></i></button>

                <div class="ui icon top pointing right pointing dropdown button black">
                  <div class="header"><i class="dropdown icon"></i> Version</div>
              
                  <div class="menu">
                    <div class="header">
                      <div class="ui compact violet message">
                        <p>{{verDescription}}</p>
                      </div>
                    </div>
                    <div class="item" (click) = "modal.show()">Save as ...</div>
                  </div>
                </div>    
            </div>
                
            
            <modal #modalSave 
               [header]="'Save'"
               [content]="'This action change current version of program, save anyway?'"
               (submit)="onSave($event, blockly.getXml())"></modal>
            
            <blockly #blockly>
            </blockly>`,
  styles: [`
         .ui.section{
            top: 10px!important;
            right: 10px!important;
            position: absolute;
         }
         .header{
            text-transform: none!important;
         }`]
})
export class EditorPage {
  version: any;
  verDescription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private state: stateService,
    private post: PostService,
    private _location: Location
  ) {

      this.version = this.store.let(fromRoot.getCurrentVersion);

      this.version.subscribe(version => {
        if(version != undefined) this.verDescription = version.description;
      });
  }

  ngOnInit() {
    $(".ui.dropdown").dropdown();

    this.store.dispatch(new actionsInfo.SetLoadingAction());
    this.store.dispatch(new actionsInfo.SetStepAction("Editor"));

    this.route["params"].subscribe(params => {

      if(params["versionID"] != 'tmp'){
        this.store.dispatch(new actionsVersion.SetCurrentAction(+params["versionID"]));
      }else{
        // return back because we not saved created version
        if(this.state.getState()["versions"].details["tmp"] == undefined){
          this._location.back();
        }
      }

      this.store.dispatch(new actionsProgram.SetCurrentAction(+params["programID"]));
      this.store.dispatch(new actionsInterface.SetCurrentAction(+params["interfaceID"]));
    });
  }

  onSave($event, xml){
    let state = this.state.getState();
    let currentID = state["versions"].currentID;

    this.store.dispatch(new actionsVersion.saveAction({
      id: currentID,
      xml: xml
    }));

    let version = this.state.getState()["versions"].details[this.state.getState()["versions"]["currentID"]];

    if(currentID == "tmp"){
      this.post.saveVersion(version).subscribe(() => { this._location.back() });
    }else{
      this.post.putVersion(version).subscribe(() => {});
    }
  }
}
