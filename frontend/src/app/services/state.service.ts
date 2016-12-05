import { Injectable } from '@angular/core';

import {Store, State} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Injectable()
export class stateService{

  constructor(private store: Store<fromRoot.State>){

  }

  getState(){
    let state: State;

    this.store.take(1).subscribe(s => state = s);
    return state;
  }
}
