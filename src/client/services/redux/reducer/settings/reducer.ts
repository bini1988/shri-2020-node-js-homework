import { STORE_SETTINGS } from './action-types';
import { SettingsActionTypes } from './action-creators';

export type SettingsState = {
  values: Partial<CI.Settings>;
}

export const initialState: SettingsState = {
  values: {},
};

export const reducer = (state = initialState, action: SettingsActionTypes) => {
  switch (action.type) {
  case STORE_SETTINGS:
    return { ...state, values: action.payload };
  default:
    return state;
  }
}
