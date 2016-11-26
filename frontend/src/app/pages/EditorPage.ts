import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import {ReferenceService} from "../services/reference.service";
import * as actions from '../actions/referenceList';
import * as actionsInfo from '../actions/info';
import * as actionsVersion from '../actions/versionList';

@Component({
  selector: 'editor-page',
  template: `
            <blockly [version] = "version | async" #blockly>
            </blockly>`
})
export class EditorPage {
  version: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private ref: ReferenceService) {

      this.version = this.store.let(fromRoot.getCurrentVersion);
  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetStepAction("Editor"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsVersion.SetCurrentAction(+params["versionID"]));
    });
  }
}
