import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import * as actionsInfo from "../actions/info";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Component({
  selector: 'home-page',
  template: `
      <div class="ui container">
        <div class="ui cards">
        <div class="card" (click) = "onSelect(list[0])">
          <div class="content">
            <div class="header"><i class="folder open icon"></i>Interfaces</div>
            <div class="meta"></div>
            <div class="description">
              List of program interfaces.
            </div>
          </div>
        </div>
        <div class="card" (click) = "onSelect(list[1])">
          <div class="content">
            <div class="header"><i class="lightning icon"></i>Execution</div>
            <div class="meta"></div>
            <div class="description">
              List of calculation logs.
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <!--<block-list (select)="onSelect($event)" [list] = "list"></block-list>-->`,
  styles: [`
         .card{
            cursor: pointer
         }`]
})
export class HomePage {
  list: any = [
    {
      title: 'Interfaces',
      description: '',
      link: './interface'
    },
    {
      title: 'Execution',
      description: '',
      link: './execution'
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
