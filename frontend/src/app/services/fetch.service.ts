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
import * as isNil from "lodash/isNil";

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

    let process = false;

    switch (step) {
      case "Home":
        this.setLoaded();
        break;
      case "InterfaceList":
        this.loadInterfaces().subscribe(data => this.setLoaded());
        break;
      case "ProgramList":
        process = false;

        interfaceID.subscribe(iid => {
          if(iid != null){

            Observable.forkJoin(this.loadInterface(iid), this.loadPrograms(iid))
                .subscribe(data => this.setLoaded());
          }
        });
        break;
      case "VersionList":
        process = false;
        Observable.combineLatest(interfaceID, programID).subscribe(([iid, pid]) => {
          if(iid != null && pid != null){
            process = true;
            Observable.forkJoin(this.loadInterface(iid), this.loadProgram(pid), this.loadVersions(pid))
                .subscribe(data => this.setLoaded());
          }
        });
        break;
      case "Editor":
        process = false;
        //TODO: rewrite!
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
              if(isNil(interfaces['details'][iid]))
                obs.push(this.loadInterface(iid));

              if(isNil(programs['details'][pid]))
                obs.push(this.loadProgram(pid));

              if(isNil(versions['details'][vid]))
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
        process = false;

        this.store.select("executions").subscribe((executions) => {
          if(!process){
            let eid = executions["currentID"];

            if(eid != null){
              process = true;

              Observable.forkJoin( this.loadLog(eid), this.loadExecutionDetail(eid), this.loadReferences() )
                  .subscribe(data => {
                    let versionID = this._state.getState()["executions"].details[eid]["program_version"];

                    this.loadUp(versionID).subscribe(data => this.setLoaded());
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
    return this.rest.getWithSearchParams(`${this.baseUrl}/program`, [ ['program_interface', interfaceId] ]).do(data => {
      this.store.dispatch(new actionsProgramList.LoadAction(data));
    });
  }

  loadProgram(id: number){
    return this.rest.get(`${this.baseUrl}/program/${id}`).do(data => {
      this.store.dispatch(new actionsProgramList.LoadDetailAction(data));
    });
  }

  loadVersions(programId: number){
    return this.rest.getWithSearchParams(`${this.baseUrl}/program-version`, [ ['program', programId] ] ).do(data => {
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
      this.store.dispatch(new actionsExecution.LoadLogAction({id: id, data: data}));
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
