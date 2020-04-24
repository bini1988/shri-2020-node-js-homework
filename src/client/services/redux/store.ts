import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer, { RootState } from './reducer';

const enhancer =  composeWithDevTools(applyMiddleware(thunk));

export default (initialState: RootState) =>
  createStore(reducer, initialState, enhancer);
