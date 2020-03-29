import { createSelector } from 'reselect';
import Api from '../../api';

export const BUILDS_STORAGE_KEY = 'builds';
export const STORE_BUILDS = '@builds/STORE_BUILDS';

/**
 * @param {Object} state Глобальный объект redux store
 * @returns {typeof initialState}
 */
export const getBuildsState = (state) => state[BUILDS_STORAGE_KEY];

/**
 * Список индентификаторов сборок
 * @param {Object} state Глобальный объект redux store
 */
export const getBuildsIds = (state) => getBuildsState(state).buildsIds;

/**
 * Map-объект сборок
 * @param {Object} state Глобальный объект redux store
 */
export const getBuildsMap = (state) => getBuildsState(state).buildsMap;

/**
 * Возвращает сборку по индентификатору
 * @param {Object} state Глобальный объект redux store
 * @param {string} id Индентификатор билда
 */
export const getBuildCardById = (state, id) => getBuildsMap(state)[id];

/**
 * Список сборок
 * @param {Object} state Глобальный объект redux store
 */
export const getBuildsCards = createSelector(
  [getBuildsIds, getBuildsMap],
  (buildsIds, buildsMap) => buildsIds.map((id) => buildsMap[id]),
);

/**
 * Сохранить список билдов
 * @param {Object[]} payload
 */
export function storeBuilds(payload) {
  return { type: STORE_BUILDS, payload };
}

/**
 * Получить список билдов
 * @param {Number} offset Смещение от начала списка
 * @param {Number} limit Количество возвращаемых элементов
 * @return {Promise}
 */
export function fetchBuilds(offset, limit) {
  return (dispatch) => Api.Builds.fetchBuilds(offset, limit)
    .then(({ data }) => {
      dispatch(storeBuilds(data));
    });
}

export const initialState = {
  buildsIds: [],
  buildsMap: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
  case STORE_BUILDS:
    return {
      ...state,
      buildsIds: action.payload.map((build) => build.id),
      buildsMap: action.payload.reduce((out, build) => {
        // eslint-disable-next-line no-param-reassign
        out[build.id] = build;
        return out;
      }, {}),
    };
  default:
    return state;
  }
}