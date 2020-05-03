import { RootState } from '../index';

export const SETTINGS_STORAGE_KEY = 'settings';

export const getSettingsState = (state: RootState) =>
  state[SETTINGS_STORAGE_KEY];

export const getSettingsValues = (state: RootState) =>
  getSettingsState(state).values;

export const getSettingOfRepoName = (state: RootState) =>
  getSettingsValues(state).repoName;
