import { createSelector } from 'reselect';
import { RootState } from '../index';

export const BUILDS_STORAGE_KEY = 'builds';

export const getBuildsState = (state: RootState) =>
  state[BUILDS_STORAGE_KEY];

export const getBuildsIds = (state: RootState) =>
  getBuildsState(state).buildsIds;

export const getBuildsMap = (state: RootState) =>
  getBuildsState(state).buildsMap;

export const getBuildsLogsMap = (state: RootState) =>
  getBuildsState(state).buildsLogsMap;

export const getBuildCardById = (state: RootState, id: string) =>
  getBuildsMap(state)[id];

export const getBuildLogsById = (state: RootState, id: string) =>
  getBuildsLogsMap(state)[id];

export const getBuildsCards = createSelector(
  [getBuildsIds, getBuildsMap],
  (buildsIds, buildsMap) => buildsIds
    .map((id) => buildsMap[id])
    .sort((buildA, buildB) => buildB.buildNumber - buildA.buildNumber),
);
