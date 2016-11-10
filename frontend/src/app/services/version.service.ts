import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import {Observable} from "rxjs";

import * as find from "lodash/find";

@Injectable()
export class VersionService{

  constructor( private rest: RestService ){

  }

  saveAsVersion(version: any){
    return this.rest.post('/business-logic/rest/program-version/new', version);
  }

  saveVersion(version: any){
    return this.rest.put(`/business-logic/rest/program-version/${version.id}`, version);
  }
}
