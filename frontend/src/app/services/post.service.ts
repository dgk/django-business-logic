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
export class PostService {

  constructor(
    private rest: RestService,
    private state: stateService
  ){

  }

  saveVersion(version){
    return this.rest.post('/business-logic/rest/program-version/new', version);
  }

  putVersion(version){
    return this.rest.put(`/business-logic/rest/program-version/${version.id}`, version);
  }
}
