import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actionsInfo from "../actions/info";

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/versionList";
import * as actionsProgram from "../actions/programList";


@Component({
  selector: 'version-list-page',
  template: `<block-list (select)="onSelect($event)" [list] = "list | async"></block-list>`
})
export class VersionListPage {
  list: any;

  private programID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private rest: RestService) {

    this.list = this.store.let(fromRoot.getVersions);

  }

  ngOnInit() {

    this.store.dispatch(new actionsInfo.SetStepAction("VersionList"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsProgram.SetCurrentAction(+params["programID"]));
    });

  }

  onSelect(item){
    this.store.dispatch(new actions.SetCurrentAction(item["id"]));
    this.router.navigate([item["id"]], { relativeTo: this.route });
  }

}
