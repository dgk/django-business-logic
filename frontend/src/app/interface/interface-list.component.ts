import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { AppState } from '../app.service';

import { BaseService } from "../services/base.service";

@Component({
  selector: 'interface-list',
  providers: [

  ],
  styleUrls: [  ],
  template:   `
              <breadcrumb [params]="params"></breadcrumb>
              <md-list>
                <md-list-item *ngFor="let programInterface of programInterfaces" (click)="onSelect(programInterface)">
                  <h3 md-line>{{programInterface.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class InterfaceListComponent {
  private programInterfaces;
  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  localState = { value: '' };

  constructor(public appState: AppState,
              public base: BaseService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

    this.base.fetchProgramInterfaces().subscribe(() => {
      this.programInterfaces = this.base.programInterfaces.getCollection();
    });

  }

  onSelect(programInterface: any){
    this.base.programInterfaces.setCurrent(programInterface);

    this.router.navigate([this.base.programInterfaces.getCurrent().getID()], { relativeTo: this.route });
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
