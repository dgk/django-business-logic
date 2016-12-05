import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from '../actions/referenceList';
import * as actionsInfo from '../actions/info';
import * as actionsVersion from '../actions/versionList';
import * as actionsProgram from '../actions/programList';
import * as actionsInterface from '../actions/prInterfaceList';

@Component({
  selector: 'editor-page',
  template: `
            <blockly #blockly>
            </blockly>`
})
export class EditorPage {
  version: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>) {

      this.version = this.store.let(fromRoot.getCurrentVersion);
  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetLoadingAction());
    this.store.dispatch(new actionsInfo.SetStepAction("Editor"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsVersion.SetCurrentAction(+params["versionID"]));
      this.store.dispatch(new actionsProgram.SetCurrentAction(+params["programID"]));
      this.store.dispatch(new actionsInterface.SetCurrentAction(+params["interfaceID"]));
    });
  }
}
