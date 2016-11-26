import { Action } from '@ngrx/store';

export const ActionTypes = {
  SET_LOADED: '[Info] all you need is loaded',
  SET_LOADING: '[Info] loading ...',
  SET_STEP: '[Info] set step'
};

export class SetLoadedAction implements Action {
  type = ActionTypes.SET_LOADED;

  constructor(public payload?: any) { }
}

export class SetLoadingAction implements Action {
  type = ActionTypes.SET_LOADING;

  constructor(public payload?: any) { }
}

export class SetStepAction implements Action {
  type = ActionTypes.SET_STEP;

  constructor(public payload: string) { }
}

export type Actions
  = SetLoadedAction | SetLoadingAction | SetStepAction;
