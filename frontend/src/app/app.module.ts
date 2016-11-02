import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { BaseService } from "./services/base.service";
import { RestService } from "./services/rest.service";

import { BlocklyComponent } from './components/blockly/blockly.component';
import { InterfaceListComponent } from './components/interface/interface-list.component';
import { ProgramComponent } from './components/program/program.component';
import { VersionComponent } from './components/version/version.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './components/home/home.component';

import { NoContentComponent } from './components/no-content/no-content.component';

import {MaterialModule} from '@angular/material';
import {BlocksService} from "./components/blockly/blocks/blocks.service";
import {ReferenceService} from "./services/reference.service";


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  BaseService,
  RestService,
  BlocksService,
  ReferenceService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContentComponent,
    BlocklyComponent,
    InterfaceListComponent,
    ProgramComponent,
    VersionComponent,
    BreadcrumbComponent,
    HomeComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    MaterialModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

