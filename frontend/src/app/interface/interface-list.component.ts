import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BackendService } from '../backend.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'interface-list',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [

  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template:   `
              <breadcrumb [params]="params"></breadcrumb>
              <md-list>
                <md-list-item *ngFor="let programInterface of programInterfaces" (click)="onSelect(programInterface.id)">
                  <h3 md-line>{{programInterface.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class InterfaceListComponent {
  private programInterfaces;
  private params: any = {};

  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState,
              public backend: BackendService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    console.log('hello `Interface` component');
    this.backend.listProgramInterfaces().subscribe(
      envelope => {
        this.programInterfaces = envelope.results;
        console.log(this.programInterfaces);
      }

    );
    // this.title.getData().subscribe(data => this.data = data);
  }

  onSelect(id: number){
    this.router.navigate([id], { relativeTo: this.route });
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
