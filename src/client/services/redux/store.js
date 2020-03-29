/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const initialState = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__;

/**
 * Создает объект Redux store
 * @return {Object} Объект redux store
 */
export function createReduxStore() {
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );
  return store;
}

export default createReduxStore();
