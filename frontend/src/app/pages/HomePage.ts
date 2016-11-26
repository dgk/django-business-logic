import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import * as actionsInfo from "../actions/info";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Component({
  selector: 'home-page',
  template: `<block-list (select)="onSelect($event)" [list] = "list"></block-list>`
})
export class HomePage {
  list: any = [
    {
      title: 'Interfaces',
      description: '',
      link: './interface'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new actionsInfo.SetStepAction("Home"));
  }

  onSelect(item){
    this.router.navigate([ item["link"] ], { relativeTo: this.route });
  }
}
