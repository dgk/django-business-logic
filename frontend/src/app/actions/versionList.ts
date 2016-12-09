import { Action } from '@ngrx/store';

export const ActionTypes = {
  LOAD: '[Versions] load Versions',
  SET_CURRENT: '[Versions] set current Version',
  LOAD_DETAIL:'[Versions] load Version detail',
  SAVE:'[Versions] save current version',
  CREATE:'[Versions] create new version'
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT;

  constructor(public payload: number) { }
}

export class LoadDetailAction implements Action {
  type = ActionTypes.LOAD_DETAIL;

  constructor(public payload: any) { }
}

export class createAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: any) { }
}

export class saveAction implements Action {
  type = ActionTypes.SAVE;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction | SetCurrentAction | LoadDetailAction | createAction | saveAction;
