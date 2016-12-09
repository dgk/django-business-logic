import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as Info from '../actions/info';
import * as find from 'lodash/find';

export interface State {
  loaded: boolean,
  saving: boolean,
  step: string
};

const initialState: State = {
  loaded: false,
  saving: false,
  step: "Home"
};

export function reducer(state = initialState, action: Info.Actions): State {
  switch (action.type) {

    case Info.ActionTypes.SET_LOADED: {
      return Object.assign({}, state , {
        loaded: true
      });
    }

    case Info.ActionTypes.SET_LOADING: {
      return Object.assign({}, state , {
        loaded: false
      });
    }

    case Info.ActionTypes.SET_STEP: {
      return Object.assign({}, state , {
        loaded: false,
        step: action.payload
      });
    }

    case Info.ActionTypes.SET_SAVING: {
      return Object.assign({}, state , {
        saving: true
      });
    }

    case Info.ActionTypes.SET_SAVED: {
      return Object.assign({}, state , {
        saving: false
      });
    }

    default: {
      return state;
    }
  }
}

export function getLoading(state$: Observable<State>) {
  return state$.select(state => state.loaded);
}

export function getStep(state$: Observable<State>) {
  return state$.select(state => state.step);
}
