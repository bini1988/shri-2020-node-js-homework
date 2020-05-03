import util from 'util';
import path from 'path';
import fs from 'fs';
import logger from '../logger';
import exec from '../utils/exec';

const exists = util.promisify(fs.exists);
const SPLIT_CHAR = '<##>';

export interface ICIRepoParams {
  repoName: string;
  baseName?: string;
  tmp: string;
}

/**
 * Работа с локальной копией репозитория
 */
export default class CIRepo {
  private baseName: string;
  private repoName: string;
  private mainBranch: string;
  private path: string;
  private url: string;

  public constructor(params: ICIRepoParams) {
    const { baseName, repoName } = params;

    this.baseName = baseName || 'https://github.com/';
    this.repoName = repoName;
    this.mainBranch = 'master';
    this.path = path.join(params.tmp, 'repos', repoName);
    this.url = `${baseName}${repoName}.git`;
  }

  public async clone() {
    if (await exists(this.path)) {
      await exec(`git -C ${this.path} fetch --all`);
      logger.info(`CIRepo: pull '${this.url}'`);
    } else {
      await exec(`git clone ${this.url} ${this.path}`);
      logger.info(`CIRepo: clone '${this.url}'`);
    }
  }

  public async checkCommit(commitHash: string) {
    try {
      const cmd = `git -C ${this.path} cat-file -t ${commitHash}`;
      const out = await exec(cmd);

      return (out === 'commit');
    } catch (error) {
      throw new Error(`CIRepo: '${commitHash}' no commit or branch \n`);
    }
  }

  public async checkout(branch: string) {
    await exec(`git -C ${this.path} checkout ${branch}`);
    logger.info(`CIRepo: checkout '${this.url}' on ${branch}`);
  }

  public async parseBranchName(hash: string) {
    const cmd = `git -C ${this.path} branch --contains ${hash} -r`;
    const out = await exec(cmd);

    return out.replace(/(\r\n|\n|\r)/gm, '').split('/').pop() || hash;
  }

  public async parseBranchMeta(hash: string) {
    await this.checkCommit(hash || this.mainBranch);
    await this.checkout(hash);

    const format = `"%h${SPLIT_CHAR}%an${SPLIT_CHAR}%s"`;
    const cmd = `git -C ${this.path} log -n 1 --pretty=format:${format}`;

    const log = await exec(cmd);
    const [commitHash, authorName, commitMessage] = log.split(SPLIT_CHAR);
    const branchName = await this.parseBranchName(hash);

    return {
      commitMessage, commitHash, branchName, authorName,
    };
  }
}
