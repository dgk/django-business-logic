import { Action } from '@ngrx/store';

export const ActionTypes = {
  LOAD: '[References] load references',
  // SET_CURRENT: '[Programs] set current program id',
  LOAD_DETAIL: '[References] load detail for reference',
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class LoadDetailAction implements Action {
  type = ActionTypes.LOAD_DETAIL;

  constructor(public payload: any) { }
}

// export class SetCurrentAction implements Action {
//   type = ActionTypes.SET_CURRENT;
//
//   constructor(public payload: number) { }
// }
//
// export class LoadDetailAction implements Action {
//   type = ActionTypes.LOAD_DETAIL;
//
//   constructor(public payload: any) { }
// }

export type Actions
  = LoadAction | LoadDetailAction;
