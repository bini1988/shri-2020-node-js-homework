import { combineReducers } from 'redux';

import settings, { SETTINGS_STORAGE_KEY } from './settings';
import builds, { BUILDS_STORAGE_KEY } from './builds';

export default combineReducers({
  [SETTINGS_STORAGE_KEY]: settings,
  [BUILDS_STORAGE_KEY]: builds,
});
