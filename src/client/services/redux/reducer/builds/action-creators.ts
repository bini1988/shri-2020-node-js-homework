import Api from '../../../api';
import { STORE_BUILDS, STORE_BUILD, STORE_BUILD_LOG } from './action-types';
import { getBuildCardById, getBuildLogsById } from './selectors';
import { AsyncThunkAction } from '../index';

export interface StoreBuildsAction {
  type: typeof STORE_BUILDS; payload: Array<CI.Build>
}

export function storeBuilds(builds: Array<CI.Build>): StoreBuildsAction {
  return { type: STORE_BUILDS, payload: builds };
}

export interface StoreBuildAction {
  type: typeof STORE_BUILD; payload: CI.Build
}

export function storeBuild(build: CI.Build): StoreBuildAction {
  return { type: STORE_BUILD, payload: build };
}

export interface StoreBuildLog {
  type: typeof STORE_BUILD_LOG; meta: { id: string }; payload: string
}

export function storeBuildLog(id: string, log: string): StoreBuildLog {
  return { type: STORE_BUILD_LOG, meta: { id }, payload: log };
}

export type BuildsActionTypes =
  StoreBuildsAction | StoreBuildAction | StoreBuildLog;

export function fetchBuilds(offset?: number, limit?: number): AsyncThunkAction {
  return (dispatch) => Api.Builds.fetchBuilds(offset, limit)
    .then(({ data }) => {
      dispatch(storeBuilds(data));
    });
}

export function fetchBuildById(id: string): AsyncThunkAction<CI.Build> {
  return (dispatch, getState) => {
    const state = getState();
    const card = getBuildCardById(state, id);

    if (card) {
      return Promise.resolve(card);
    }
    return Api.Builds.fetchBuildById(id)
      .then(({ data }) => {
        dispatch(storeBuild(data));
        return data;
      });
  };
}

export function fetchBuildLogsById(id: string): AsyncThunkAction<string> {
  return (dispatch, getState) => {
    const state = getState();
    const logs = getBuildLogsById(state, id);

    if (logs) {
      return Promise.resolve(logs);
    }
    return Api.Builds.fetchBuildLogsById(id)
      .then(({ data }) => {
        dispatch(storeBuildLog(id, data));
        return data;
      });
  };
}

export function queueBuild(commitHash: string): AsyncThunkAction<CI.Build> {
  return (dispatch) => Api.Builds.queueBuild(commitHash)
    .then(({ data }) => dispatch(fetchBuildById(data.id)));
}
