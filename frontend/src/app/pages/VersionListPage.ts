import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/versionList";


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

    this.store.take(1).subscribe(state => {
      this.programID = state.programs.currentID;

      this.getVersions().subscribe(data => {
        this.store.dispatch(new actions.LoadAction(data));
      });
    });

  }

  getVersions(){
    return this.rest.getWithSearchParams('/business-logic/rest/program-version', ['program', this.programID]);
  }

  getVersion(id){
    return this.rest.get(`/business-logic/rest/program-version/${id}`);
  }

  onSelect(item){
    this.getVersion(item["id"]).subscribe((data) => {
      this.store.dispatch(new actions.SetCurrentAction(item["id"]));
      this.store.dispatch(new actions.LoadDetailAction(data));

      this.router.navigate([item["id"]], { relativeTo: this.route });
    });
  }

}
