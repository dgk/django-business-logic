import { Action } from '@ngrx/store';

export const ActionTypes = {
  LOAD: '[Program Interfaces] load interfaces',
  SET_CURRENT_ID: '[Program Interfaces] set current interface',
  LOAD_INTERFACE_DETAIL:'[Program Interfaces] load interface detail'
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT_ID;

  constructor(public payload: number) { }
}

export class LoadDetailAction implements Action {
  type = ActionTypes.LOAD_INTERFACE_DETAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction | SetCurrentAction | LoadDetailAction;
