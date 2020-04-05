const asyncHandler = require('express-async-handler');
const serialize = require('serialize-javascript');
const api = require('../services/ci-api');
const { renderAppToString } = require('../../../static/main.bundle.ssr');

/**
 * Получить исходное состояние приложения
 * @param {string} [buildId] Индентификатор билда
 */
async function fetchInitialState(buildId) {
  const { data: { data: settings } = {} } = await api.Settings.fetch();
  const { data: { data: builds } } = await api.Build.fetchBuilds(0, 9);

  const buildsIds = builds.map((build) => build.id);
  const buildsMap = builds.reduce((out, build) => {
    // eslint-disable-next-line no-param-reassign
    out[build.id] = build;
    return out;
  }, {});

  if (buildId) {
    const { data: { data: build } } = await api.Build.fetchBuild(buildId);
    buildsMap[buildId] = build;
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
  const page = renderAppToString(initialState, { location });
  const serializedInitialState = serialize(initialState);

  res.status(200).render('index', { page, serializedInitialState });
});

module.exports = { handleIndex };
