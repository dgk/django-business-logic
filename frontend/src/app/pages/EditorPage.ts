import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/referenceList";
import {ReferenceService} from "../services/reference.service";


@Component({
  selector: 'editor-page',
  template: `
            <blockly [version] = "version | async" #blockly>
            </blockly>`
})
export class EditorPage {
  version: any;

  argFileds: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private rest: RestService,
    private ref: ReferenceService) {

      this.version = this.store.let(fromRoot.getCurrentVersion);
      // this.argFileds = this.store.let(fromRoot.getArgFields);

  }

  ngOnInit() {
    // Observable.forkJoin(this.getReferences).subscribe();
  }

  getReferences(){
    return this.rest.get('/business-logic/rest/reference');
      // this.store.dispatch(new actions.LoadAction(data));
  }




}
