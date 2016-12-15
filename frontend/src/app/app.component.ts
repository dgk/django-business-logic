import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {BreadcrumbComponent} from './components/breadcrumb.component';

import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import {Observable} from "rxjs";

import * as actionsInfo from "./actions/info";
import {FetchService} from "./services/fetch.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './css/semantic.css',
    './app.component.css'
  ],
  template: `
    <main>
    <div class="ui container">
      <breadcrumb [params] = 'params'></breadcrumb>
     
    </div>
      
      
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  private params: any = {};
  private step: any;

  constructor(
    private store: Store<fromRoot.State>,
    private fetch: FetchService,
    private route: ActivatedRoute
  ) {
    this.step = this.store.let(fromRoot.getStep);

    this.step.subscribe(step => {
      this.fetch.fetchAllWeNeed(step);
    });
  }

  ngOnInit() {
  }

}

