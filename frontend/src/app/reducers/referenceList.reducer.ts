import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as referenceList from '../actions/referenceList';

import * as find from 'lodash/find';


export interface State {
  entities: any[],
  details: any
};

const initialState: State = {
  entities: [],
  details: {}
};

export function reducer(state = initialState, action: referenceList.Actions): State {
  switch (action.type) {

    case referenceList.ActionTypes.LOAD: {
      return {
        entities: action.payload,
        details: Object.assign({}, state.details)
      };
    }

    default: {
      return state;
    }
  }
}

export function getList(state$: Observable<State>) {
  return state$.select(state => state.entities);
}

