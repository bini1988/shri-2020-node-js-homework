const asyncHandler = require('express-async-handler');
const serialize = require('serialize-javascript');
const api = require('../services/ci-api');
const { renderAppToString } = require('../../../static/main.bundle.ssr');

/**
 * Получить набор настроек
 */
async function fetchSettings() {
  const { data: { data = {} } = {} } = await api.Settings.fetch();
  return data.repoName ? data : null;
}

/**
 * Получить параметры сборки по индентификатору
 * @param {string} [buildId] Индентификатор билда
 */
async function fetchBuildById(buildId) {
  const { data } = await api.Build.fetchBuild(buildId);
  return data.data;
}

/**
 * Получить список сборок
 */
async function fetchBuilds() {
  const { data = [] } = await api.Build.fetchBuilds();

  return {
    buildsIds: data.map((build) => build.id),
    buildsMap: data.reduce((out, build) => {
      // eslint-disable-next-line no-param-reassign
      out[build.id] = build;
      return out;
    }, {}),
  };
}

/**
 * Получить исходное состояние приложения
 * @param {string} [buildId] Индентификатор билда
 */
async function fetchInitialState(buildId) {
  const settings = await fetchSettings();

  if (!settings) { return undefined; }

  const { buildsIds, buildsMap } = await fetchBuilds();

  if (buildId) {
    buildsMap[buildId] = await fetchBuildById(buildId);
  }
  return {
    settings: { values: settings },
    builds: { buildsIds, buildsMap, buildsLogsMap: {} },
  };
}

const handleIndex = asyncHandler(async (req, res) => {
  const { url: location, params = {} } = req;
  const { buildId } = params;

  const initialState = await fetchInitialState(buildId);
  const serializedState = serialize(initialState);

  const appMarkup = (process.env.NODE_ENV === 'production')
    ? renderAppToString(initialState, { location }) : '';
  const env = process.env.NODE_ENV;
  const viewParams = { serializedState, appMarkup, env };

  res.status(200).render('index', viewParams);
});

module.exports = { handleIndex };
