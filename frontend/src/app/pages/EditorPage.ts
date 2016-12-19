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

import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {SimpleNotificationsComponent} from 'angular2-notifications/src/simple-notifications.component';

@Component({
  selector: 'editor-page',
  template: `
            <!--<div class="ui section">-->
                <!--<button class="ui icon violet button" (click) = "onSave(blockly.getXml())"><i class="save icon"></i></button>-->

                <!--<div class="ui icon top pointing right pointing dropdown button black">-->
                  <!--<div class="header"><i class="dropdown icon"></i> Version</div>-->
              <!---->
                  <!--<div class="menu">-->
                    <!--<div class="header">-->
                      <!--<div class="ui compact violet message">-->
                        <!--<p>{{verDescription}}</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item" (click) = "saveAs.show()">Save as ...</div>-->
                  <!--</div>-->
                <!--</div>    -->
            <!--</div>-->
             
            <div class="btn-group">
                <button class="btn-group-item" (click) = "onSave(blockly.getXml())">Save</button> 
                <button class="btn-group-item" (click) = "saveAs.show()">Save as</button>
            </div>
            
            <div>
            <modal #saveAs 
               [header]="'Save as ...'"
               [title]="'Title'" 
               [title_value]="verTitle" 
               [description]="'Description'" 
               [description_value]="verDescription"
               (submit)="onSaveAs($event, blockly.getXml())"></modal>   
            </div>
               
            <div *ngIf = "saving" class="ui active page dimmer">
              <div class="ui text loader">Saving</div>
            </div>
            
            <simple-notifications [options]="options"></simple-notifications>
            
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
  saving: boolean = false;

  verDescription: any;
  verTitle: any;

  options = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    // animate: 'scale',
    position: ['right', 'bottom']
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private state: stateService,
    private post: PostService,
    private _location: Location,
    private notification: NotificationsService
  ) {

      this.version = this.store.let(fromRoot.getCurrentVersion);

      this.version.subscribe(version => {
        if(version != undefined){
          this.verDescription = version.description;
          this.verTitle = version.title;
        }
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

  onSave(xml){
    this.saving = true;

    let state = this.state.getState();
    let currentID = state["versions"].currentID;

    this.store.dispatch(new actionsVersion.saveAction({
      id: currentID,
      xml: xml
    }));

    let version = this.state.getCurrentVersion();

    if(currentID == "tmp"){
      this.post.saveVersion(version)
          .subscribe(
              data => {
                this.saving = false;
                this._location.back()
              },
              this.onSavingError
          );
    }else{
      this.post.putVersion(version)
          .subscribe(
              data => {
                this.saving = false;
                this.notification.success('Success!', 'Version saved!');
              },
              this.onSavingError
          );
    }
  }

  onSavingError(err){
    this.saving = false;
    this.notification.error('Error!', 'Saving failed');
  }

  onSaveAs($event, xml){
    this.saving = true;

    let currentVersion = this.state.getCurrentVersion();

    let version = {
      xml: xml,
      title: $event["title"],
      description: $event["description"],
      program: currentVersion["program"]
    };

    this.post.saveVersion(version)
        .subscribe(
            data => {
              this.saving = false;
              this._location.back()
            },
            this.onSavingError
        );
  }
}
