const asyncHandler = require('express-async-handler');
const serialize = require('serialize-javascript');
const api = require('../services/ci-api');
const { renderAppToString } = require('../../../static/main.bundle.ssr');

/**
 * Получить параметры сборки по индентификатору
 * @param {string} [buildId] Индентификатор билда
 */
async function fetchBuildById(buildId) {
  const { data } = await api.Build.fetchBuild(buildId);
  return data.data;
}

/**
 * Получить исходное состояние приложения
 * @param {string} [buildId] Индентификатор билда
 */
async function fetchInitialState(buildId) {
  const { data: { data: settings } = {} } = await api.Settings.fetch();
  const { data: { data: builds = [] } } = await api.Build.fetchBuilds();

  const buildsIds = builds.map((build) => build.id);
  const buildsMap = builds.reduce((out, build) => {
    // eslint-disable-next-line no-param-reassign
    out[build.id] = build;
    return out;
  }, {});

  if (buildId) {
    buildsMap[buildId] = await fetchBuildById(buildId);
  }

  return {
    settings: { values: settings },
    builds: { buildsIds, buildsMap, buildsLogsMap: {} },
  };
}

const handleIndex = asyncHandler(async (req, res) => {
  const location = req.url;
  const match = /^\/build\/(.*)$/.exec(req.url);
  const buildId = match ? match[1] : undefined;

  const initialState = await fetchInitialState(buildId);
  const serializedState = serialize(initialState);

  const appMarkup = (process.env.NODE_ENV === 'production')
    ? renderAppToString(initialState, { location }) : '';
  const env = process.env.NODE_ENV;
  const viewParams = { serializedState, appMarkup, env };

  res.status(200).render('index', viewParams);
});

module.exports = { handleIndex };
