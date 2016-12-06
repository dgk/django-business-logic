import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actionsInfo from '../actions/info';
import * as actionsExecution from '../actions/execution';

@Component({
  selector: 'readonly-editor-page',
  template: `
            <blockly-readonly #blockly>
            </blockly-readonly>`
})
export class ReadonlyEditorPage {
  version: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>) {

    // this.version = this.store.let(fromRoot.getCurrentVersion);
  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetLoadingAction());
    this.store.dispatch(new actionsInfo.SetStepAction("ReadonlyEditor"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsExecution.SetCurrentAction(+params["executionID"]));
    });
  }
}
