import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as versionList from '../actions/versionList';
import * as find from 'lodash/find';

export interface State {
  count: number,
  next: any,
  previous: any,
  entities: any[],
  currentID: any,
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

export function reducer(state = initialState, action: versionList.Actions): State {
  switch (action.type) {

    case versionList.ActionTypes.LOAD: {
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

    case versionList.ActionTypes.SET_CURRENT: {
      let new_state = Object.assign({}, state);
      new_state["currentID"] = action.payload;
      return new_state;
    }

    case versionList.ActionTypes.LOAD_DETAIL: {
      let payload = action.payload;

      let version = find(state.entities, (entity) => entity.title == payload.title);
      let id;
      if(version){
        id = version["id"];
      }else{
        id = state.currentID;
      }

      let new_state = Object.assign({}, state);
      new_state.details = Object.assign({}, state.details, {
        [ id ]: payload
      });

      return new_state;

    }

    case versionList.ActionTypes.SAVE: {
      let payload = action.payload;

      let new_state = Object.assign({}, state);

      let ver = Object.assign({}, state.details[payload["id"]], {
        xml: payload["xml"]
      });

      new_state.details = Object.assign({}, state.details, {
        [ payload["id"] ]: ver
      });

      return new_state;
    }

    case versionList.ActionTypes.CREATE: {
      let payload = action.payload;

      let new_state = Object.assign({}, state);
      new_state.details = Object.assign({}, state.details, {
        tmp : {
          title: payload.title,
          description: payload.description,
          xml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
          program: payload.programID
        }
      });

      new_state.currentID = 'tmp';
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
