/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const buildLogMock = require('../mocks/mock-build-log');
const api = require('../ci-api');
const logger = require('../logger');
const Queue = require('../utils/queue');

function sleep(timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
}

/**
 * Управление очередью сборки
 */
class CIBuilder {
  constructor() {
    this._queue = new Queue();
    this._isFinishing = true;
  }

  /**
   * Поставить сборку в очередь
   * @param {Object} params
   * @param {string} params.buildId Индентификатор сборки
   * @param {string} params.pwd Рабочая дирректория
   * @param {string} params.cmd Команда для сборки
   */
  enqueue({ buildId, pwd, cmd }) {
    this._queue.enqueue({ buildId, pwd, cmd });

    logger.info(`Enqueue build ${buildId} (#${this._queue.size} in queue)`);

    // Если обратка очереди закончена запустим цикл
    // обработки очереди
    if (this._isFinishing) {
      this._isFinishing = false;
      setImmediate(() => this.execute());
    }
  }

  /**
   * Обработат элемент очереди
   */
  async execute() {
    const build = this._queue.front();
    const { buildId, pwd, cmd } = build;
    const dateTime = new Date().toISOString();

    await this.handleBuildStart({ buildId, dateTime });

    // Эмуляция сборки
    await sleep(3000, pwd, cmd);

    const duration = Math.floor(Math.random() * 2 * 60 * 60 * 1000); // мсек
    const success = (Math.random() > 0.5);
    const buildLog = buildLogMock;

    await this.handleBuildFinish({
      buildId, duration, success, buildLog,
    });

    this._queue.dequeue();

    if (this._queue.front()) {
      // Запускам обработку следующего элемента очереди
      setImmediate(() => this.execute());
    } else {
      // Все элементы очереди обработаны
      this._isFinishing = true;
    }
  }

  /**
   * Начало сборки
   * @param {Object} build Параметры сборки
   */
  async handleBuildStart(build) {
    try {
      logger.info(`Start build execution for ${build.buildId}`);
      await api.Build.startBuild(build);
    } catch (error) {
      logger.error(`Start build request failed for ${build.id}`, error);
    }
  }

  /**
   * Завершение сборки
   * @param {Object} build Параметры сборки
   */
  async handleBuildFinish(build) {
    try {
      logger.info(`Finish build execution for ${build.buildId}`);
      await api.Build.finishBuild(build);
    } catch (error) {
      logger.error(`Finish build request failed for ${build.buildId}`, error);
    }
  }
}

module.exports = CIBuilder;
