import { combineReducers } from 'redux';

import settings from './settings';
import builds from './builds';

export default combineReducers({ settings, builds });
