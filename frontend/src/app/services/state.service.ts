import { Injectable } from '@angular/core';

import {Store, State} from "@ngrx/store";
import * as fromRoot from '../reducers';
import find = require("lodash/find");

@Injectable()
export class stateService{

  constructor(private store: Store<fromRoot.State>){

  }

  getState(){
    let state: fromRoot.State;

    this.store.take(1).subscribe(s => state = s);
    return state;
  }

  getArguments(){
    let state = this.getState();
    return state["prInterfaces"].details[state["prInterfaces"].currentID]["arguments"];
  }

  getEnv(){
    //TODO: return version_env or program_env or interface_env
    let state = this.getState();
    let version_env = state["versions"].details[state["versions"].currentID]["environment"];
    let program_env = state["programs"].details[state["programs"].currentID]["environment"];
    let interface_env = state["prInterfaces"].details[state["prInterfaces"].currentID]["environment"];

    return version_env || program_env || interface_env;
  }

  getCurrentVersion(){
    return this.getState()["versions"]["details"][this.getState()["versions"]["currentID"]];
  }

  getCurrentPrInterface(){
    return this.getState()["prInterfaces"]["details"][this.getState()["prInterfaces"]["currentID"]];
  }

  getCurrentProgram(){
    return this.getState()["programs"]["details"][this.getState()["programs"]["currentID"]];
  }

  getCurrentExecution(){
    return this.getState()["executions"]["details"][this.getState()["executions"]["currentID"]];
  }

  getFunction(func_name: string){
    let func;

    let env = this.getEnv();
    env['libraries'].forEach((lib) => {
      func = find(lib["functions"], (func) => {
        return func["title"] == func_name;
      });
    });

    return func;
  }
}
