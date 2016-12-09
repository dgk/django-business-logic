import { Action } from '@ngrx/store';

export const ActionTypes = {
  CLEAR: '[Breadcrumbs] clear',
  SET_NAVIGATIONEND_TRUE: '[Breadcrumbs] navigationEnd true',
  SET_NAVIGATIONEND_FALSE: '[Breadcrumbs] navigationEnd false',
  FILL: '[Breadcrumbs] fill'
};

export class ClearAction implements Action {
  type = ActionTypes.CLEAR;

  constructor(public payload?: any) { }
}

export class FillAction implements Action {
  type = ActionTypes.FILL;

  constructor(public payload?: any) { }
}

export class NavigationEndAction implements Action {
  type = ActionTypes.SET_NAVIGATIONEND_TRUE;

  constructor(public payload?: any) { }
}

export class NavigationInProcessAction implements Action {
  type = ActionTypes.SET_NAVIGATIONEND_FALSE;

  constructor(public payload?: any) { }
}

export type Actions
  = ClearAction | FillAction | NavigationEndAction | NavigationInProcessAction;
