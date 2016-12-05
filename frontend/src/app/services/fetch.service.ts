import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

import * as actionsInterfaceList from "../actions/prInterfaceList";
import * as actionsProgramList from "../actions/programList";
import * as actionsVersionList from "../actions/versionList";
import * as actionsReferenceList from "../actions/referenceList";
import * as actionsInfo from "../actions/info";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

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
    let interfaceID = this.store.let(fromRoot.getCurrentInterfaceID);
    let programID = this.store.let(fromRoot.getCurrentProgramID);
    let versionID = this.store.let(fromRoot.getCurrentVersionID);

    switch (step) {
      case "Home":
        break;
      case "InterfaceList":
        this.loadInterfaces().subscribe();
        break;
      case "ProgramList":
        interfaceID.subscribe(id => {
          if(id != null){
            this.loadPrograms(id).subscribe( data => this.setLoaded() );
          }
        });
        break;
      case "VersionList":
        programID.subscribe(id => {
          if(id != null){
            this.loadVersions(id).subscribe( data => this.setLoaded() );
          }
        });
        break;
      case "Editor":
        let process = false;

        Observable.combineLatest(
          this.store.select('versions'),
          this.store.select('programs'),
          this.store.select('prInterfaces')
        ).subscribe( ([versions, programs, interfaces]) => {
          let vid = versions["currentID"];
          let pid = programs["currentID"];
          let iid = interfaces["currentID"];

          if(vid != null && pid != null && iid != null){
            let obs = [];
            if(isNullOrUndefined(interfaces['details'][iid]))
              obs.push(this.loadInterface(iid));

            if(isNullOrUndefined(programs['details'][pid]))
              obs.push(this.loadProgram(pid));

            if(isNullOrUndefined(versions['details'][vid]))
              obs.push(this.loadVersion(vid));

            obs.push(this.loadReferences());

            if(!process && obs.length != 0){
              process = true;
              Observable.forkJoin(obs).subscribe( data => {
                this.setLoaded();
              });
            }

          }
        });
        break;
    }
  }

  setLoaded(){
    this.store.dispatch(new actionsInfo.SetLoadedAction());
  }

  loadReferences(){
    return this.rest.get(`${this.baseUrl}/reference`).do(data => {
      this.store.dispatch(new actionsReferenceList.LoadAction(data));
    });
  }

  loadReferenceDetail(referenceName: string){
    return this.rest.get(`${this.baseUrl}/reference/${referenceName}`).do(data => {
      this.store.dispatch(new actionsReferenceList.LoadDetailAction({
        name: referenceName,
        data: data
      }));
    });
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
