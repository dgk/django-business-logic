import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

import * as actionsInterfaceList from "../actions/prInterfaceList";
import * as actionsProgramList from "../actions/programList";
import * as actionsVersionList from "../actions/versionList";
import * as actionsInfo from "../actions/info";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class FetchService {
  protected baseUrl = '/business-logic/rest';

  constructor(
    private rest: RestService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ){
  }

  fetchAllWeNeed(step: string){
    switch (step) {
      case "Home":
        break;
      case "InterfaceList":
        this.loadInterfaces().subscribe();
        break;
      case "ProgramList":
        let interfaceID = this.store.let(fromRoot.getCurrentInterfaceID);
        interfaceID.subscribe(id => {
          if(id != null){
            Observable.forkJoin(
              this.loadPrograms(id),
              this.loadInterface(id)
            ).subscribe( this.store.dispatch(new actionsInfo.SetLoadedAction() ));
          }
        });
        break;
      case "VersionList":
        let programID = this.store.let(fromRoot.getCurrentProgramID);
        programID.subscribe(id => {
          if(id != null){
            Observable.forkJoin(
              this.loadVersions(id),
              this.loadProgram(id)
            ).subscribe( this.store.dispatch(new actionsInfo.SetLoadedAction() ));
          }
        });
        break;
      case "Editor":
        let versionID = this.store.let(fromRoot.getCurrentVersionID);
        versionID.subscribe(id => {
          if(id != null){
            this.loadVersion(id)
              .subscribe( this.store.dispatch(new actionsInfo.SetLoadedAction() ));
          }
        });
        break;
    }
  }

  loadInterfaces(){
    return this.rest.get(`${this.baseUrl}/program-interface`).do(data => {
      this.store.dispatch(new actionsInterfaceList.LoadAction(data));
    });
  }

  loadInterface(id: number){
    return this.rest.get(`${this.baseUrl}/program-interface/${id}`).do(data => {
      this.store.dispatch(new actionsInterfaceList.LoadDetailAction(data));
    });
  }

  loadPrograms(interfaceId: number){
    return this.rest.getWithSearchParams(`${this.baseUrl}/program`, ['program-interface', interfaceId]).do(data => {
      this.store.dispatch(new actionsProgramList.LoadAction(data));
    });
  }

  loadProgram(id: number){
    return this.rest.get(`${this.baseUrl}/program/${id}`).do(data => {
      this.store.dispatch(new actionsProgramList.LoadDetailAction(data));
    });
  }

  loadVersions(programId: number){
    return this.rest.getWithSearchParams(`${this.baseUrl}/program-version`, ['program', programId]).do(data => {
      this.store.dispatch(new actionsVersionList.LoadAction(data));
    });
  }

  loadVersion(id: number){
    return this.rest.get(`${this.baseUrl}/program-version/${id}`).do(data => {
      this.store.dispatch(new actionsVersionList.LoadDetailAction(data));
    });
  }

}
