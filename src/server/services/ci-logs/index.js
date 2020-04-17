/* eslint-disable no-await-in-loop */
const util = require('util');
const path = require('path');
const fs = require('fs');
const api = require('../ci-api');

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

const TMP_DIR = process.env.TMP_DIR || 'tmp';
const MAX_CACHE_LIFE_TIME = 30; // min
const CLEANUP_TIMEOUT = 30 * 60 * 1000; // ms

/**
 * Управление кэшированим логов билдов
 */
class CILogs {
  /**
   * @param {Object} params
   * @param {string} params.tmp Путь к временной дирректории
   */
  constructor(params = {}) {
    const {
      tmp = TMP_DIR,
    } = params;

    this.basePath = path.join(tmp, 'logs');

    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath);
    }
    this.setCleanupCacheTask();
  }

  /**
   * Путь к кэшу лога для указанного индентификатора билда
   * @param {string} buildId Индентификатор билда
   * @return {Promise<string|null>}
   */
  toCachePath(buildId) {
    return path.join(this.basePath, buildId);
  }

  /**
   * Поставить таймаут очистки устаревшего кэша логов
   */
  setCleanupCacheTask() {
    setTimeout(async () => {
      await this.cleanupCache();
      this.setCleanupCacheTask();
    }, CLEANUP_TIMEOUT);
  }

  /**
   * Очистить устаревший кэш логов
   */
  async cleanupCache() {
    if (await exists(this.basePath)) {
      const filesNames = await readdir(this.basePath);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < filesNames.length; i++) {
        const filePath = path.resolve(this.basePath, filesNames[i]);
        const fileStats = await stat(filePath);
        const fileLifeTime = Date.now() - (+fileStats.birthtime);

        if (fileLifeTime > MAX_CACHE_LIFE_TIME * 60 * 1000) {
          await unlink(filePath);
        }
      }
    }
  }

  /**
   * Возвращает null или закэшированный лог по индентификатору билда
   * @param {string} buildId Индентификатор билда
   * @return {Promise<string|null>}
   */
  async requestCache(buildId) {
    const cachePath = this.toCachePath(buildId);

    if (await exists(cachePath)) {
      return readFile(cachePath, { encoding: 'utf-8' });
    }
    return null;
  }

  /**
   * Закэшированный лог по индентификатору билда
   * @param {string} buildId Индентификатор билда
   * @param {string} data Содержимое лога
   * @return {Promise<string|null>}
   */
  async createCache(buildId, data) {
    const cachePath = this.toCachePath(buildId);

    return writeFile(cachePath, data, { encoding: 'utf-8' });
  }

  /**
   * Возвращает лог по индентификатору билда
   * @param {string} buildId Индентификатор билда
   * @return {Promise}
   */
  async fetchLogsByBuildId(buildId) {
    const cache = await this.requestCache(buildId);

    if (cache !== null) { return cache; }

    const { data: { status } = {} } = await api.Build.fetchBuild(buildId);
    const { data: log } = await api.Build.fetchBuildLog(buildId);

    if (status !== 'Waiting' && status !== 'InProgress') {
      await this.createCache(buildId, log);
    }
    return log;
  }
}

module.exports = CILogs;
