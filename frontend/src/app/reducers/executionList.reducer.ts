import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as execution from '../actions/execution';
import * as find from 'lodash/find';


export interface State {
  count: number,
  next: any,
  previous: any,
  entities: any[],
  currentID: number,
  details: any,
  logs: any
};

const initialState: State = {
  count: 0,
  next: 0,
  previous: 0,
  entities: [],
  currentID: null,
  details: {},
  logs: {}
};

export function reducer(state = initialState, action: execution.Actions): State {
  switch (action.type) {

    case execution.ActionTypes.LOAD: {
      let copy_payload = Object.assign({}, action.payload);

      return {
        count: action.payload.count,
        next: 0,
        previous: 0,
        entities: action.payload.results,
        currentID: state.currentID,
        logs: Object.assign({}, state.logs)
      };
    }

    case execution.ActionTypes.SET_CURRENT_ID: {
      let new_state = Object.assign({}, state);
      new_state["currentID"] = action.payload;
      return new_state;
    }

    case execution.ActionTypes.LOAD_EXECUTION_DETAIL: {
      let new_state = Object.assign({}, state);
      new_state.details = Object.assign({}, state.details, {
        [ action.payload.id ]: action.payload
      });
      return new_state;
    }

    case execution.ActionTypes.LOAD_EXECUTION_LOG: {
      let payload = action.payload;

      let new_state = Object.assign({}, state);
      new_state.logs = Object.assign({}, state.logs, {
        [ payload.id ]: payload.data
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

// export function getDetails(state$: Observable<State>) {
//   return state$.select(state => state.details);
// }
//
export function getCurrentID(state$: Observable<State>) {
  return state$.select(state => state.currentID);
}
//
// export function getArgFields(state$: Observable<State>) {
//   return combineLatest(
//     state$.let(getDetails),
//     state$.let(getCurrentID)
//   ).map(([ details, currentID ]) => details[+currentID]);
// }


