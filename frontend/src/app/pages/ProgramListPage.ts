import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actionsInfo from "../actions/info";

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actionsProgram from "../actions/programList";
import * as actionsInterface from "../actions/prInterfaceList";


@Component({
  selector: 'program-list-page',
  template: `<block-list (select)="onSelect($event)" [list] = "list | async"></block-list>`
})
export class ProgramListPage {
  list: any;

  private interfaceID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private rest: RestService) {

    this.list = this.store.let(fromRoot.getPrograms);

  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetStepAction("ProgramList"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsInterface.SetCurrentAction(+params["interfaceID"]));
    });
  }

  onSelect(item){
    this.store.dispatch(new actionsProgram.SetCurrentAction(item["id"]));
    this.router.navigate([item["id"]], { relativeTo: this.route });
  }

}
