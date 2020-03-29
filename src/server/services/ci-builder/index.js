const EventEmitter = require('events');
const buildLogMock = require('../mocks/mock-build-log');

function sleep(timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
}

/**
 * Управление очередью сборки
 */
class CIBuilder extends EventEmitter {
  constructor() {
    super();

    this.queue = [];
    this.isExecuted = false;

    this.on('build:finish', () => {
      if (this.queue.length > 0) {
        this.run(this.queue.shift());
      }
    });
  }

  /**
   * Выполнить сборку
   * @param {Object} params
   * @param {string} params.buildId Индентификатор сборки
   * @param {string} params.pwd Рабочая дирректория
   * @param {string} params.cmd Команда для сборки
   */
  async run({ buildId, pwd, cmd }) {
    this.isExecuted = true;

    const dateTime = new Date().toISOString();
    const startParams = { buildId, dateTime };

    this.emit('build:start', startParams);

    await sleep(100); // Эмуляция сборки

    const duration = Math.floor(Math.random() * 2 * 60 * 60 * 1000); // мсек
    const success = (Math.random() > 0.5);
    const buildLog = buildLogMock;
    const finishParams = {
      buildId, duration, success, buildLog,
    };

    this.emit('build:finish', finishParams);
    this.isExecuted = false;
  }

  /**
   * Поставить сборку на выполненние
   * @param {Object} params
   * @param {string} params.buildId Индентификатор сборки
   * @param {string} params.pwd Рабочая дирректория
   * @param {string} params.cmd Команда для сборки
   */
  async execute({ buildId, pwd, cmd } = {}) {
    const build = { buildId, pwd, cmd };

    if (this.isExecuted) {
      this.queue.push(build);
      this.emit('build:queue', build);
    } else {
      this.run(build);
    }
  }
}

module.exports = CIBuilder;
