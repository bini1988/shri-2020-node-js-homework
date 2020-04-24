import { STORE_BUILDS, STORE_BUILD, STORE_BUILD_LOG } from './action-types';
import { BuildsActionTypes } from './action-creators';

export type BuildsState = {
  buildsIds: string[];
  buildsMap: IDictionary<CI.Build>;
  buildsLogsMap: IDictionary<string>;
}

export const initialState: BuildsState = {
  buildsIds: [],
  buildsMap: {},
  buildsLogsMap: {},
};

export const reducer = (state: BuildsState = initialState, action: BuildsActionTypes) => {
  switch (action.type) {
  case STORE_BUILDS:
    return {
      ...state,
      buildsIds: action.payload.map((build) => build.id),
      buildsMap: action.payload.reduce<IDictionary<CI.Build>>((out, build) => {
        // eslint-disable-next-line no-param-reassign
        out[build.id] = build;
        return out;
      }, {}),
    };
  case STORE_BUILD:
    return {
      ...state,
      buildsIds: state.buildsIds.includes(action.payload.id)
        ? state.buildsIds
        : [action.payload.id, ...state.buildsIds],
      buildsMap: {
        ...state.buildsMap,
        [action.payload.id]: action.payload,
      },
    };
  case STORE_BUILD_LOG:
    return {
      ...state,
      buildsLogsMap: {
        ...state.buildsLogsMap,
        [action.meta.id]: action.payload,
      },
    };
  default:
    return state;
  }
}
