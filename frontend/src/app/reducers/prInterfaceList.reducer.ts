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
      let id;
      if(prInterface){
        id = prInterface["id"];
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

export function getDetails(state$: Observable<State>) {
  return state$.select(state => state.details);
}

export function getCurrentID(state$: Observable<State>) {
  return state$.select(state => state.currentID);
}

export function getCurrent(state$: Observable<State>) {
  return combineLatest(
      state$.let(getDetails),
      state$.let(getCurrentID)
  ).map(([ details, currentID ]) => details[+currentID]);
}

export function getCurrentTitle(state$: Observable<State>) {
  return combineLatest(
    state$.let(getDetails),
    state$.let(getCurrentID)
  ).map(([ details, currentID ]) => details[+currentID] && details[+currentID]["title"]);
}

export function getArgFields(state$: Observable<State>) {
  return combineLatest(
    state$.let(getDetails),
    state$.let(getCurrentID)
  ).map(([ details, currentID ]) => details[+currentID]);
}


