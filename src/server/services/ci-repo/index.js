const util = require('util');
const path = require('path');
const fs = require('fs');
const logger = require('../logger');
const exec = require('../utils/exec');

const exists = util.promisify(fs.exists);
const TMP_DIR = process.env.TMP_DIR || 'tmp';
const SPLIT_CHAR = '<##>';

/**
 * Работа с локальной копией репозитория
 */
class CIRepo {
  /**
   * @param {Object} params
   * @param {string} params.repoName Имя репозитория
   * @param {string} [params.baseName] Хост репозитория
   * @param {string} [params.tmp] Путь к временной дирректории
   */
  constructor(params = {}) {
    const {
      repoName = '',
      baseName = 'https://github.com/',
      tmp = TMP_DIR,
    } = params;

    this.base = baseName;
    this.name = repoName;
    this.branch = 'master';
    this.path = path.join(tmp, 'repos', this.name);
    this.url = `${this.base}${this.name}.git`;
  }

  /**
   * Клонивать репозиторий в локальную директорию
   */
  async clone() {
    if (await exists(this.path)) {
      await exec(`git -C ${this.path} fetch --all`);
      logger.info(`CIRepo: pull '${this.url}'`);
    } else {
      await exec(`git clone ${this.url} ${this.path}`);
      logger.info(`CIRepo: clone '${this.url}'`);
    }
  }

  /**
   * Существует ли переданный коммит или ветка
   * @param {string} commitHash Хэш коммита или имя ветки
   * @return {boolean}
   */
  async checkCommit(commitHash = '') {
    try {
      const cmd = `git -C ${this.path} cat-file -t ${commitHash}`;
      const out = await exec(cmd);

      return (out === 'commit');
    } catch (error) {
      throw new Error(`CIRepo: Can not found commit or branch ${commitHash}\n`);
    }
  }

  /**
   * Перейти к заданной ветке/коммиту
   * @param {string} branch Название ветки или хэш коммита
   */
  async checkout(branch) {
    await exec(`git -C ${this.path} checkout ${branch}`);
    logger.info(`CIRepo: checkout '${this.url}' on ${branch}`);
  }

  /**
   * Возвращает имя ветки
   * @param {string} hash Название ветки или хэш коммита
   * @return {string}
   */
  async parseBranchName(hash) {
    const cmd = `git -C ${this.path} branch --contains ${hash} -r`;
    const output = await exec(cmd);

    return output ? output.replace(/(\r\n|\n|\r)/gm, '').split('/').pop() : '';
  }

  /**
   * Вернуть мета информацию для заданной ветки или хэш коммита
   * @param {string} [hash] Название ветки или хэш коммита
   * @return {Object}
   */
  async parseBranchMeta(hash = this.branch) {
    await this.checkCommit(hash);
    await this.checkout(hash);

    const format = `"%h${SPLIT_CHAR}%an${SPLIT_CHAR}%s"`;
    const cmd = `git -C ${this.path} log -n 1 --pretty=format:${format}`;

    const log = await exec(cmd);
    const [commitHash, authorName, commitMessage] = log.split(SPLIT_CHAR);
    const branchName = await this.parseBranchName(hash);

    return {
      commitMessage,
      commitHash,
      branchName,
      authorName,
    };
  }
}

module.exports = CIRepo;
