/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const EventEmitter = require('events');
const api = require('../ci-api');
const CIBuilder = require('../ci-builder');
const CILogs = require('../ci-logs');
const CIRepo = require('../ci-repo');

/**
 * @typedef {Object} Settings
 * @property {string} repoName Имя репозитория
 * @property {string} buildCommand Команда для сборки
 * @property {string} mainBranch Ветка для сборки
 * @property {number} period Период мониторига состояния репозитория
 */

/**
 * Управление CI системой
 */
class CIManager extends EventEmitter {
  /**
   * @param {Object} params
   * @param {Object} params.settings Параметры CI системы
   * @param {Object} params.tmp Путь к временной дирректории
   */
  constructor(params = {}) {
    super();

    const { settings = {}, tmp } = params;
    const { repoName } = settings;

    /**
     * @type {Settings}
     */
    this._settings = settings;
    /**
     * @type {CIRepo}
     */
    this._repo = new CIRepo({ repoName, tmp });
    /**
     * @type {CILogs}
     */
    this._logs = new CILogs({ tmp });
    /**
     * @type {CIBuilder}
     */
    this._builder = new CIBuilder();
  }

  /**
   * Сервис управления логами билдов
   */
  get logs() {
    return this._logs;
  }

  /**
   * Задать параметры CI системы
   * @param {Settings} settings Параметры системы
   */
  async setup(settings = {}) {
    const {
      repoName = '',
      buildCommand = '',
      mainBranch = 'master',
      period = 10,
    } = settings;

    this._settings = {
      repoName,
      buildCommand,
      mainBranch,
      period,
    };

    if (this._repo.name !== repoName) {
      this._repo = new CIRepo(repoName);
      await this._repo.clone();
    }
    // Автоматически запускаем сборку при изменении параметров
    this.run(mainBranch);
  }

  /**
   * Запустить CI систему
   * @param {string} [commitHash] Запустить для заданного коммита или ветки
   * @return {Promise}
   */
  async run(commitHash) {
    if (!this._repo) {
      throw new Error('Setup CI repo settings first');
    }
    const hash = commitHash || this._settings.mainBranch;

    const params = await this._repo.parseBranchMeta(hash);
    const responce = await api.Build.queueBuild(params);

    const { data: { data = {} } = {} } = responce;
    const { id: buildId } = data;
    const cmd = this._settings.buildCommand;
    const pwd = this._repo.path;

    // Ставим билд в очередь
    this._builder.enqueue({ buildId, cmd, pwd });

    return data;
  }
}

module.exports = CIManager;
