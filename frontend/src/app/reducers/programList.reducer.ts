import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as programList from '../actions/programList';

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

export function reducer(state = initialState, action: programList.Actions): State {
  switch (action.type) {

    case programList.ActionTypes.LOAD: {
      let copy_payload = Object.assign({}, action.payload);

      return {
        count: action.payload.count,
        next: 0,
        previous: 0,
        entities: action.payload.results,
        currentID: null,
        details: Object.assign({}, state.details)
      };
    }

    case programList.ActionTypes.SET_CURRENT: {
      let new_state = Object.assign({}, state);
      new_state["currentID"] = action.payload;
      return new_state;
    }

    case programList.ActionTypes.LOAD_DETAIL: {
      let payload = action.payload;

      let program = find(state.entities, (entity) => entity.title == payload.title);
      let id;
      if(program){
        id = program["id"];
      }else{
        id = state.currentID;
      }

      let new_state = Object.assign({}, state);
      new_state.details = Object.assign({}, state.details, {
        [ id ]: payload
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

export function getCurrentID(state$: Observable<State>) {
  return state$.select(state => state.currentID);
}

export function getDetails(state$: Observable<State>) {
  return state$.select(state => state.details);
}

export function getCurrentTitle(state$: Observable<State>) {
  return combineLatest(
    state$.let(getDetails),
    state$.let(getCurrentID)
  ).map(([ details, currentID ]) => details[+currentID] && details[+currentID]["title"]);
}

