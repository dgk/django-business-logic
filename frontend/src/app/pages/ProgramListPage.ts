import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/programList";


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

    this.store.take(1).subscribe(state => {
      this.interfaceID = state.prInterfaces.currentID;

      this.getPrograms().subscribe(data => {
        this.store.dispatch(new actions.LoadAction(data));
      });
    });

  }

  getPrograms(){
    return this.rest.getWithSearchParams('/business-logic/rest/program', ['program-interface', this.interfaceID]);
  }

  getProgram(id){
    return this.rest.get(`/business-logic/rest/program/${id}`);
  }

  onSelect(item){
    this.getProgram(item["id"]).subscribe((data) => {
      this.store.dispatch(new actions.SetCurrentAction(item["id"]));
      this.store.dispatch(new actions.LoadDetailAction(data));

      this.router.navigate([item["id"]], { relativeTo: this.route });
    });
  }

}
