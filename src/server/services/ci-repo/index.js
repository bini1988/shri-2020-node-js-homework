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
  constructor(name = '', base) {
    this.base = base || 'https://github.com/';
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
      await exec('git pull --all', this.path);
      return this;
    } catch (error) {
      // Делаем локальную копию репозитория во временную директорию
      await exec(`git clone ${this.url} ${this.path}`);
      return this;
    }
  }

  /**
   * Существует ли переданный коммит
   * @param {string} name Хэш коммита или имя ветки
   */
  async isExist(name = '') {
    try {
      const cmd = `git -C ${this.path} cat-file -t ${name}`;
      const out = await exec(cmd, this.path);

      return (out === 'commit');
    } catch (error) {
      throw new Error(`CIRepo: Can not found commit or branch ${name}\n`);
    }
  }

  /**
   * Перейти к заданной ветке/коммиту
   * @param {string} target Название ветки или хэш коммита
   */
  async checkout(target) {
    await exec(`git -C ${this.path} checkout ${target}`, this.path);
  }

  /**
   * Возвращает имя ветки
   * @param {string} hash Название ветки или хэш коммита
   */
  async getBranchByCommit(hash) {
    const cmd = `git -C ${this.path} branch --contains ${hash} -r`;
    const output = await exec(cmd, this.path);

    return output ? output.replace(/(\r\n|\n|\r)/gm, '').split('/').pop() : '';
  }

  /**
   * Вернуть мета информацию репозитория
   * @param {string} [target] Название ветки или хэш коммита
   */
  async meta(target = this.branch) {
    await this.isExist(target);
    await this.checkout(target);

    const format = `"%h${SPLIT_CHAR}%an${SPLIT_CHAR}%s"`;
    const cmd = `git -C ${this.path} log -n 1 --pretty=format:${format}`;

    const log = await exec(cmd, this.path);
    const [commitHash, authorName, commitMessage] = log.split(SPLIT_CHAR);
    const branchName = await this.getBranchByCommit(target);

    return {
      commitMessage,
      commitHash,
      branchName,
      authorName,
    };
  }
}

module.exports = CIRepo;
