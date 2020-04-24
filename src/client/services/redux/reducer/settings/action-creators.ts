import Api from '../../../api';
import { fetchBuilds } from '../builds';
import { STORE_SETTINGS } from './action-types';
import { AsyncThunkAction } from '../index';

export function storeSettings(payload: Partial<CI.Settings>) {
  return { type: STORE_SETTINGS, payload };
}

export interface StoreSettingsAction {
  type: typeof STORE_SETTINGS; payload: Partial<CI.Settings>
}

export type SettingsActionTypes = StoreSettingsAction;

export function fetchSettings(): AsyncThunkAction {
  return (dispatch) => Api.Settings.fetchSettings()
    .then(({ data }) => { dispatch(storeSettings(data)); });
}

export function saveSettings(values: Partial<CI.Settings>): AsyncThunkAction<CI.Settings> {
  return (dispatch) => Api.Settings.saveSettings(values)
    .then(({ data: { settings } }) => {
      dispatch(storeSettings(settings));
      return settings;
    });
}

export function applySettings(values: Partial<CI.Settings>): AsyncThunkAction<CI.Settings> {
  return (dispatch) => dispatch(saveSettings(values))
    .then((settings) => {
      dispatch(fetchBuilds())
      return settings;
    });
}
