import _ from 'lodash';
import asyncHandler from 'express-async-handler';
import serialize from 'serialize-javascript';
import { Request, Response } from 'express';
import api from '../services/ci-api';
import toTable from '../services/utils/to-table';
import { RootState } from '../../client/services/redux/reducer';
const { renderAppToString } = require('../../../static/main.bundle.ssr');

async function fetchState(buildId: string): Promise<RootState | undefined> {
  const { data: settings } = await api.Settings.fetch();

  if (_.isEmpty(settings)) {
    return undefined;
  }
  const { data: builds = [] } = await api.Build.fetchBuilds();
  const [buildsMap, buildsIds] = toTable(builds);
  const { data: build } = await api.Build.fetchBuildOrUndefined(buildId);

  if (buildId && build) {
    buildsMap[buildId] = build;
  }
  return {
    settings: { values: settings },
    builds: { buildsIds, buildsMap, buildsLogsMap: {} },
  };
}

export const handleIndex = asyncHandler(async (req: Request, res: Response) => {
  const { params: { buildId } } = req;
  const state = await fetchState(buildId);

  if (buildId && !state?.builds.buildsMap[buildId]) {
    res.redirect('/');
    return;
  }
  const serializedState = serialize(state);
  const appMarkup = (process.env.NODE_ENV === 'production')
    ? renderAppToString(state, req) : '';
  const env = process.env.NODE_ENV;

  res.status(200).render('index', { serializedState, appMarkup, env });
});
