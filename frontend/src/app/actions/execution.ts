import { Action } from '@ngrx/store';

export const ActionTypes = {
  LOAD: '[Execution] load executions',
  SET_CURRENT_ID: '[Execution] set current execution',
  LOAD_EXECUTION_DETAIL: '[Execution] load execution detail',
  LOAD_EXECUTION_LOG:'[Execution] load log for execution'
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class SetCurrentAction implements Action {
  type = ActionTypes.SET_CURRENT_ID;

  constructor(public payload: number) { }
}

export class LoadLogAction implements Action {
  type = ActionTypes.LOAD_EXECUTION_LOG;

  constructor(public payload: any) { }
}

export class LoadDetailAction implements Action {
  type = ActionTypes.LOAD_EXECUTION_DETAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction | SetCurrentAction | LoadLogAction | LoadDetailAction;
