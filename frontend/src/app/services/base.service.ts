import { Injectable } from '@angular/core';

import { RestService } from './rest.service';


import { ProgramInterface, ProgramInterfaceCollection } from "../models/programInterface";
import { Program, ProgramCollection } from "../models/program";
import { Version, VersionCollection } from "../models/version";
import {Observable} from "rxjs";

@Injectable()
export class BaseService {
  protected baseUrl = '/business-logic/rest';

  programInterfaces: any;
  programs: any;
  versions: any;

  currentVersion: any;

  constructor(private rest: RestService){

  }

  fetchAll(interfaceID?: number, programID?: number, versionID?: number){
    let observables = [];

    observables.push( this.fetchProgramInterfaces() );

    if(interfaceID) observables.push( this.fetchPrograms(interfaceID) );
    if(programID) observables.push( this.fetchVersions(programID) );
    if(versionID) observables.push( this.fetchVersion(versionID) );


    return Observable.forkJoin(observables)
      .map((data) => {
        if(interfaceID) this.programInterfaces.setCurrentID( interfaceID );

        if(programID) this.programs.setCurrentID( programID );

        if(versionID) this.versions.setCurrentID( versionID );

        if(data[3]){
          this.currentVersion = data[3];
        }
    });
  }

  fetchProgramInterfaces(){

    this.programInterfaces = new ProgramInterfaceCollection();

    return this.rest.get(this.programInterfaces.getUrl()).map((data) => {
      data.results.map( (result) => {
        this.programInterfaces.addNew( new ProgramInterface(result["id"], result["title"]) );
      } );
    });
  }

  fetchPrograms( interfaceID: number ): any{

    this.programs = new ProgramCollection();

    return this.rest.getWithSearchParams(
      this.programs.getUrl(),
      [ ['program_interface',  interfaceID] ]
    ).map((data) => {
      data.results.map( (result) => {
        this.programs.addNew( new Program(result["id"], result["title"]) );
      } );
    });
  }

  fetchVersions(programID: number){
    this.versions = new VersionCollection();

    return this.rest.getWithSearchParams(
      this.versions.getUrl(),
      [ [ 'program',  programID] ]
    ).map((data) => {
      data.results.map( (result) => {
        this.versions.addNew( new Version(result["id"], result["title"], result["description"]) );
      } );
    });
  }

  fetchVersion(versionID: number){
    return this.rest.get(`${VersionCollection.getBaseURL()}/${versionID}`);
  }


  getEnvironment(){

  }


}
