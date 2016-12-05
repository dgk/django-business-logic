import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

import * as actionsInterfaceList from "../actions/prInterfaceList";
import * as actionsProgramList from "../actions/programList";
import * as actionsVersionList from "../actions/versionList";
import * as actionsReferenceList from "../actions/referenceList";
import * as actionsExecution from "../actions/execution";
import * as actionsInfo from "../actions/info";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {stateService} from "./state.service";

@Injectable()
export class FetchService {
  protected baseUrl = '/business-logic/rest';

  constructor(
    private rest: RestService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private _state: stateService
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
      case "ExecutionList":
        this.loadExecutionList().subscribe(data => {
          this.setLoaded();
        });
        break;
      case "ReadonlyEditor":
        let process = false;

        this.store.select("executions").subscribe((executions) => {
          if(!process){
            let eid = executions.currentID;

            if(eid != null){
              process = true;

              this.loadExecutionDetail(eid).subscribe(data => {
                let versionID = this._state.getState()["executions"].details[eid]["program_version"];

                Observable.forkJoin(this.loadLog(eid), this.loadUp(versionID)).subscribe(data => this.setLoaded());
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

  loadExecutionList(){
    return this.rest.get(`${this.baseUrl}/execution`).do(data => {
      this.store.dispatch(new actionsExecution.LoadAction(data));
    });
  }

  loadLog(id){
    return this.rest.get(`${this.baseUrl}/execution/${id}/log`).do(data => {
      this.store.dispatch(new actionsExecution.LoadLogAction(data));
    });
  }

  loadExecutionDetail(id){
    return this.rest.get(`${this.baseUrl}/execution/${id}`).do(data => {
      this.store.dispatch(new actionsExecution.LoadDetailAction(data));
    });
  }

  loadUp(versionID){
    this.store.dispatch(new actionsVersionList.SetCurrentAction(versionID));

    return this.loadVersion(versionID).flatMap(data => {
      let programID = this._state.getState()["versions"].details[this._state.getState()["versions"].currentID].program;
      this.store.dispatch(new actionsProgramList.SetCurrentAction(programID));

      return this.loadProgram(programID).flatMap(data => {
        let interfaceID = this._state.getState()["programs"].details[this._state.getState()["programs"].currentID].program_interface;
        this.store.dispatch(new actionsInterfaceList.SetCurrentAction(interfaceID));

        return this.loadInterface(interfaceID);
      });
    });
  }

}
