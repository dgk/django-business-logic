import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as Breadcrumbs from '../actions/breadcrumbs';
import * as find from 'lodash/find';

export interface State {
  entities: any[],
  navigationEnd: boolean
};

const initialState: State = {
  entities: [],
  navigationEnd: false
};

export function reducer(state = initialState, action: Breadcrumbs.Actions): State {
  switch (action.type) {

    case Breadcrumbs.ActionTypes.FILL: {
      return Object.assign({}, state , {
        entities: action.payload
      });
    }

    case Breadcrumbs.ActionTypes.CLEAR: {
      return Object.assign({}, state , {
        entities: []
      });
    }

    case Breadcrumbs.ActionTypes.SET_NAVIGATIONEND_TRUE: {
      return Object.assign({}, state , {
        navigationEnd: true
      });
    }

    case Breadcrumbs.ActionTypes.SET_NAVIGATIONEND_FALSE: {
      return Object.assign({}, state , {
        navigationEnd: false
      });
    }

    default: {
      return state;
    }
  }
}

export function getList(state$: Observable<State>) {
  return state$.select(state => state.entities);
}

export function getNavigationEnd(state$: Observable<State>) {
  return state$.select(state => state.navigationEnd);
}
