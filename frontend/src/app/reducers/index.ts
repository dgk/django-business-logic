import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


import * as PrInterfaceList from './prInterfaceList.reducer';
import * as ProgramList from './programList.reducer';
import * as VersionList from './versionList.reducer';
import * as ReferenceList from './referenceList.reducer';
import * as ExecutionList from './executionList.reducer';
import * as Info from './info.reducer';
import * as Breadcrumbs from './breadcrumbs.reducer';


export interface State {
  prInterfaces: PrInterfaceList.State,
  programs: ProgramList.State,
  versions: VersionList.State,
  references: ReferenceList.State,
  executions: ExecutionList.State,

  info: Info.State,
  breadcrumbs: Breadcrumbs.State,
  router: fromRouter.RouterState
}

const reducers = {
  prInterfaces: PrInterfaceList.reducer,
  programs: ProgramList.reducer,
  versions: VersionList.reducer,
  references: ReferenceList.reducer,
  executions: ExecutionList.reducer,

  info: Info.reducer,
  breadcrumbs: Breadcrumbs.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

export const getState = (state$: Observable<State>) =>
  state$.select(state => state);

export const getPrInterfaceListState = (state$: Observable<State>) =>
  state$.select(state => state.prInterfaces);

export const getInterfaces = compose(PrInterfaceList.getList, getPrInterfaceListState);

export const getCurrentPrInterface = compose(PrInterfaceList.getCurrent, getPrInterfaceListState);

export const getCurrentPrInterfaceTitle = compose(PrInterfaceList.getCurrentTitle, getPrInterfaceListState);

export const getExecutionListState = (state$: Observable<State>) =>
  state$.select(state => state.executions);

export const getExecutions = compose(ExecutionList.getList, getExecutionListState);

export const getBreadcrumbsState = (state$: Observable<State>) =>
  state$.select(state => state.breadcrumbs);

export const getBreadcrumbs = compose(Breadcrumbs.getList, getBreadcrumbsState);
export const getNavigationEnd = compose(Breadcrumbs.getNavigationEnd, getBreadcrumbsState);

export const getCurrentInterfaceID = compose(PrInterfaceList.getCurrentID, getPrInterfaceListState);

export const getProgramListState = (state$: Observable<State>) =>
  state$.select(state => state.programs);

export const getPrograms = compose(ProgramList.getList, getProgramListState);

export const getCurrentProgramID = compose(ProgramList.getCurrentID, getProgramListState);

export const getVersionListState = (state$: Observable<State>) =>
  state$.select(state => state.versions);

export const getVersions = compose(VersionList.getList, getVersionListState);

export const getCurrentVersion = compose(VersionList.getCurrent, getVersionListState);

export const getCurrentVersionID = compose(VersionList.getCurrentID, getVersionListState);

export const getReferenceState = (state$: Observable<State>) =>
  state$.select(state => state.references);

export const getReferences = compose(ReferenceList.getList, getReferenceState);

export const getArgFields = compose(PrInterfaceList.getArgFields, getPrInterfaceListState);

export const getInfoState = (state$: Observable<State>) =>
  state$.select(state => state.info);

export const getLoadState = compose(Info.getLoading, getInfoState);

export const getStep = compose(Info.getStep, getInfoState);

export const getCurrentProgramTitle = compose(ProgramList.getCurrentTitle, getProgramListState);
export const getCurrentVersionTitle = compose(VersionList.getCurrentTitle, getVersionListState);
export const getCurrentExecutionId = compose(ExecutionList.getCurrentID, getExecutionListState);


