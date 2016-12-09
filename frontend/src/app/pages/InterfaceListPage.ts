import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";

import * as actions from "../actions/prInterfaceList";
import * as actionsInfo from "../actions/info";

@Component({
  selector: 'interface-list-page',
  template: `<block-list (select)="onSelect($event)" [list] = "list | async"></block-list>`
})
export class InterfaceListPage {
  list: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private rest: RestService) {

    this.list = this.store.let(fromRoot.getInterfaces);

  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetStepAction("InterfaceList"));
  }

  onSelect(item){
    this.store.dispatch(new actions.SetCurrentAction(item["id"]));
    this.router.navigate([item["id"]], { relativeTo: this.route });
  }
}
