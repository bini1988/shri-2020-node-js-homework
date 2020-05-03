import logger from '../logger';
import api from '../ci-api';
import CILogs from '../ci-logs';
import CIRepo from '../ci-repo';

export interface ICIManagerParams {
  settings: CI.Settings;
  tmp: string;
}

export default class CIManager {
  private tmp: string;
  private settings: CI.Settings;
  private repo: CIRepo;

  public logs: CILogs;

  public constructor(params: ICIManagerParams) {
    const { repoName } = params.settings;

    this.tmp = params.tmp;
    this.settings = params.settings;
    this.repo = new CIRepo({ repoName, tmp: params.tmp });
    this.logs = new CILogs({ tmp: params.tmp });
  }

  public async setup(settings: CI.Settings) {
    const { repoName, mainBranch } = settings;
    const tmp = this.tmp;

    this.settings = settings;
    this.repo = new CIRepo({ repoName, tmp });

    await this.repo.clone();

    return this.queueBuild(mainBranch);
  }

  public async queueBuild(commitHash: string) {
    logger.info(commitHash
      ? `CIManager: run for '${commitHash}'`
      : 'CIManager: run');

    if (!this.repo) {
      throw new Error('Setup CI repo settings first');
    }
    const hash = commitHash || this.settings.mainBranch;
    const params = await this.repo.parseBranchMeta(hash);
    const { data: buildQueue } = await api.Build.queueBuild(params);

    logger.info(`CIManager: enqueue build '${buildQueue.id}'`);

    return buildQueue;
  }
}
