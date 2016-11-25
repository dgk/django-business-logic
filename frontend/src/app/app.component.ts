/*
 * Angular 2 decorators and services
 */

import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';

import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import {Observable} from "rxjs";


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './css/semantic.css',
    './app.component.css'
  ],
  template: `
    <main>
      <breadcrumb [params] = 'params'></breadcrumb>
      
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  private params: any = {};

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

  }

}

