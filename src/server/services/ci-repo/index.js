const util = require('util');
const path = require('path');
const fs = require('fs');
const exec = require('../utils/exec');

const access = util.promisify(fs.access);
const TMP_DIR = process.env.TMP_DIR || 'tmp';
const SPLIT_CHAR = '<##>';

/**
 * Работа с локальной копией репозитория
 */
class CIRepo {
  constructor(name = '', base = 'https://github.com/') {
    this.base = base;
    this.name = name;
    this.branch = 'master';
    this.path = path.join(TMP_DIR, 'repos', name);
    this.url = `${this.base}${name}.git`;
  }

  /**
   * Клонивать репозиторий в локальную директорию
   */
  async clone() {
    try {
      await access(this.path, fs.constants.F_OK);
      await exec('git pull --all');
      return this;
    } catch (error) {
      // Делаем локальную копию репозитория во временную директорию
      await exec(`git clone ${this.url} ${this.path}`);
      return this;
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
