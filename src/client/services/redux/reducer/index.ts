import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { combineReducers, Action } from 'redux';
import {
  SETTINGS_STORAGE_KEY,
  reducer as settingsReducer,
  SettingsState,
} from './settings';
import {
  BUILDS_STORAGE_KEY,
  reducer as buildsReducer,
  BuildsState,
} from './builds';

export type RootState = {
  [SETTINGS_STORAGE_KEY]: SettingsState;
  [BUILDS_STORAGE_KEY]: BuildsState;
};
export type AsyncThunkAction<ReturnType = void> =
  ThunkAction<Promise<ReturnType>, RootState, unknown, Action<string>>
export type AsyncThunkDispatch =
  ThunkDispatch<RootState, unknown, Action<string>>

export default combineReducers({
  [SETTINGS_STORAGE_KEY]: settingsReducer,
  [BUILDS_STORAGE_KEY]: buildsReducer,
});
