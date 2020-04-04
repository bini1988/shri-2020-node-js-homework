const EventEmitter = require('events');
const api = require('../ci-api');
const logger = require('../logger');
const CIRepo = require('../ci-repo');
const CIBuilder = require('../ci-builder');

/**
 * Управление CI системой
 */
class CIManager extends EventEmitter {
  constructor() {
    super();

    this.repo = null;
    this.period = 10; // minutes
    this.builder = new CIBuilder();

    this.builder.on('build:queue', ({ buildId }) => {
      logger.info(`Queue build ${buildId}`);
    });
    this.builder.on('build:start', async (build) => {
      try {
        logger.info(`Start build execution for ${build.buildId}`);
        await api.Build.startBuild(build);
      } catch (error) {
        logger.error(`Start build request failed for ${build.id}`, error);
      }
    });
    this.builder.on('build:finish', async (build) => {
      try {
        logger.info(`Finish build execution for ${build.buildId}`);
        await api.Build.finishBuild(build);
      } catch (error) {
        logger.error(`Finish build request failed for ${build.buildId}`, error);
      }
    });
  }

  /**
   * Запукс CI с заданной конфигурацией
   * @param {Object} settings
   * @param {string} [settings.repoName] Имя репозитория
   * @param {string} [settings.buildCommand] Команда для сборки
   * @param {string} settings.mainBranch Ветка для сборки
   * @param {number} [settings.period] Период мониторига состояния репозитория
   */
  async run(settings = {}) {
    const { repoName = this.repo.name, buildCommand, mainBranch } = settings;

    try {
      if (!this.repo || (this.repo.name !== repoName)) {
        this.repo = new CIRepo(repoName);
      }

      await this.repo.clone();
      const params = await this.repo.meta(mainBranch);
      const pwd = this.repo.path;

      const { data: { data } = {} } = await api.Build.queueBuild(params);

      this.builder.execute({ buildId: data.id, cmd: buildCommand, pwd });

      return data;
    } catch (error) {
      logger.error('Execution run build error\n', error);
    }
  }
}

module.exports = new CIManager();
