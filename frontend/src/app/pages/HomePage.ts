import { Component, ViewEncapsulation } from '@angular/core';
import {AppState} from "../app.service";
import {Router, ActivatedRoute} from "@angular/router";

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
    public appState: AppState) {
  }

  ngOnInit() {

  }

  onSelect(item){
    this.router.navigate([ item["link"] ], { relativeTo: this.route });
  }
}
