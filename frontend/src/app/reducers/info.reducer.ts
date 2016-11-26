import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as Info from '../actions/info';
import * as find from 'lodash/find';

export interface State {
  loaded: boolean,
  step: string
};

const initialState: State = {
  loaded: false,
  step: "Home"
};

export function reducer(state = initialState, action: Info.Actions): State {
  switch (action.type) {

    case Info.ActionTypes.SET_LOADED: {
      return {
        loaded: true,
        step: state.step
      };
    }

    case Info.ActionTypes.SET_LOADING: {
      return {
        loaded: false,
        step: state.step
      };
    }

    case Info.ActionTypes.SET_STEP: {
      return {
        loaded: false,
        step: action.payload
      };
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
