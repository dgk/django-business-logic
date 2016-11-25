import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/versionList";


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
    private rest: RestService) {

      this.version = this.store.let(fromRoot.getCurrentVersion);

  }

  ngOnInit() {
    // this.store.take(1).subscribe(state => {
    //   let id = state.versions.currentID;
    //
    //   console.log(state.versions.details[+id]);
    // });
  }


}
