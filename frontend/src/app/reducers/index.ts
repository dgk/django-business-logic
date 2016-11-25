import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';


import * as PrInterfaceList from './prInterfaceList.reducer';
import * as ProgramList from './programList.reducer';
import * as VersionList from './versionList.reducer';
import * as ReferenceList from './referenceList.reducer';


export interface State {
  prInterfaces: PrInterfaceList.State,
  programs: ProgramList.State,
  versions: VersionList.State,
  references: ReferenceList.State
}

const reducers = {
  prInterfaces: PrInterfaceList.reducer,
  programs: ProgramList.reducer,
  versions: VersionList.reducer,
  references: ReferenceList.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}


export const getPrInterfaceListState = (state$: Observable<State>) =>
  state$.select(state => state.prInterfaces);

export const getInterfaces = compose(PrInterfaceList.getList, getPrInterfaceListState);



export const getProgramListState = (state$: Observable<State>) =>
  state$.select(state => state.programs);

export const getPrograms = compose(ProgramList.getList, getProgramListState);


export const getVersionListState = (state$: Observable<State>) =>
  state$.select(state => state.versions);

export const getVersions = compose(VersionList.getList, getVersionListState);

export const getCurrentVersion = compose(VersionList.getCurrent, getVersionListState);

export const getArgFields = compose(PrInterfaceList.getArgFields, getPrInterfaceListState);
