import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as programInterface from '../actions/prInterfaceList';
import * as find from 'lodash/find';


export interface State {
  count: number,
  next: any,
  previous: any,
  entities: any[],
  currentID: number,
  details: any
};

const initialState: State = {
  count: 0,
  next: 0,
  previous: 0,
  entities: [],
  currentID: null,
  details: {}
};

export function reducer(state = initialState, action: programInterface.Actions): State {
  switch (action.type) {

    case programInterface.ActionTypes.LOAD: {
      let copy_payload = Object.assign({}, action.payload);

      return {
        count: action.payload.count,
        next: 0,
        previous: 0,
        entities: action.payload.results,
        currentID: state.currentID,
        details: Object.assign({}, state.details)
      };
    }

    case programInterface.ActionTypes.SET_CURRENT_ID: {
      let new_state = Object.assign({}, state);
      new_state["currentID"] = action.payload;
      return new_state;
    }

    case programInterface.ActionTypes.LOAD_INTERFACE_DETAIL: {
      let payload = action.payload;

      let prInterface = find(state.entities, (entity) => entity.title == payload.title);

      let new_state = Object.assign({}, state);
      new_state.details = Object.assign({}, state.details, {
        [ prInterface["id"] ]: payload
      });

      return new_state;

    }

    default: {
      return state;
    }
  }
}

export function getList(state$: Observable<State>) {
  return state$.select(state => state.entities);
}

