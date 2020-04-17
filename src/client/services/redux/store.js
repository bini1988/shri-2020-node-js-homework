/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

/**
 * Создает объект Redux store
 * @param {Object} initialState Исходный объек состояния redux store
 * @return {Object} Объект redux store
 */
export default function createReduxStore(initialState) {
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
