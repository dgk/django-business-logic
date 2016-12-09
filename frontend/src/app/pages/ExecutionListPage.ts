import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";

import * as actionsInfo from "../actions/info";
import * as actions from "../actions/execution";

@Component({
  selector: 'execution-list-page',
  template: `<block-list (select)="onSelect($event)" [list] = "list | async" [list_icon] = "icon"></block-list>`
})
export class ExecutionListPage {
  list: any;
  icon = "asterisk";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private rest: RestService) {

    this.list = this.store.let(fromRoot.getExecutions);

  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetStepAction("ExecutionList"));
  }

  onSelect(item){
    this.store.dispatch(new actions.SetCurrentAction(item["id"]));
    this.router.navigate([item["id"]], { relativeTo: this.route });
  }
}
