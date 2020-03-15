const EventEmitter = require('events');
const fs = require('fs');
const exec = require('../utils/exec');
const api = require('../ci-api');
const logger = require('../logger');

function sleep(timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
}

/**
 * Управление CI системой
 */
class CIManager extends EventEmitter {
  constructor() {
    super();
    this.repoName = '';
    this.buildCommand = '';
    this.mainBranch = 'master';
    this.period = 10; // minutes
    this.TMP_DIR = process.env.TMP_DIR || 'tmp';
  }

  /**
   * Запукс CI с заданной конфигурацией
   * @param {Object} settings
   * @param {string} settings.repoName Имя репозитория
   * @param {string} settings.buildCommand Команда для сборки
   * @param {string} settings.mainBranch Ветка для сборки
   * @param {number} settings.period Период мониторига состояния репозитория
   */
  async run(settings = {}) {
    this.repoName = settings.repoName;
    this.buildCommand = settings.buildCommand;
    this.mainBranch = settings.mainBranch;
    this.period = settings.period;

    await this.clone(this.repoName);
    await this.queue(await this.read(this.repoName, this.mainBranch));
  }

  /**
   * Клонивать репозиторий в локальную директорию
   * @param {string} repoName Имя репозитория
   */
  async clone(repoName) {
    const path = `${this.TMP_DIR}/${repoName}`;

    try {
      await fs.promises.access(path, fs.constants.F_OK);
      await exec(`git -C ${path} fetch`);
    } catch (error) {
      const url = `https://github.com/${repoName}.git`;

      await exec(`git clone ${url} ${path}`);
    }
  }

  /**
   * Вернуть мета информацию репозитория
   * @param {string} repoName Имя репозитория
   * @param {string} branchName Имя ветки
   */
  async read(repoName, branchName) {
    const path = `${this.TMP_DIR}/${repoName}`;

    await exec(`git -C ${path} checkout ${branchName}`);

    const log = await exec(`git -C ${path} log -n 1 --pretty=format:"%h\t%an\t%s"`);
    const [commitHash, authorName, commitMessage] = log.split('\t');

    return {
      commitMessage, commitHash, branchName, authorName,
    };
  }

  /**
   * Поставить сборку в очередь выполнения
   * @param {Object} params
   * @param {string} params.commitMessage Сообщение коммита
   * @param {string} params.commitHash Хэш коммита
   * @param {string} params.branchName Ветка для сборки
   * @param {string} params.authorName Автор коммита
   */
  async queue(params) {
    try {
      await api.Build.queueBuild(params);
      // TODO: Метод queueBuild должен возвращать buildId?
      const [{ id: buildId }] = await api.Build.fetchBuilds(0, 1);

      await this.processing(buildId);
    } catch (error) {
      logger.error('Can not queue build', error);
    }
  }

  /**
   * Выполнить сборку
   * @param {string} buildId Индентификатор сборки
   */
  async processing(buildId) {
    const dateTime = new Date().toISOString();
    const startParams = { buildId, dateTime };

    await api.Build.startBuild({ buildId, dateTime });
    this.emit('build:start', startParams);

    await sleep(100);

    const MAX_DURATION = 1 * 60 * 60; // сек
    const MIN_DURATION = 60; // сек
    const duration = Math.floor(
      Math.random() * (MAX_DURATION - MIN_DURATION + 1) + MIN_DURATION,
    );
    const success = (Math.random() > 0.5);
    const buildLog = `BuildId: ${buildId} Duration: ${duration} Status: ${success}`;
    const finishParams = {
      buildId, duration, success, buildLog,
    };

    await api.Build.finishBuild(finishParams);
    this.emit('build:finish', finishParams);
  }
}

module.exports = new CIManager();
