/* eslint-disable no-await-in-loop */
import util from 'util';
import path from 'path';
import fs from 'fs';
import api from '../ci-api';

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

const TMP_DIR = process.env.TMP_DIR || 'tmp';
const MAX_CACHE_LIFE_TIME = 30; // min
const CLEANUP_TIMEOUT = 30 * 60 * 1000; // ms

export interface CILogsParams {
  tmp: string;
}

/**
 * Управление кэшированим логов билдов
 */
export default class CILogs {
  private path: string;

  public constructor(params: CILogsParams) {
    const { tmp = TMP_DIR } = params;

    this.path = path.join(tmp, 'logs');

    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    this.setCleanupCacheTask();
  }

  private toCachePath(buildId: string) {
    return path.join(this.path, buildId);
  }

  /**
   * Поставить таймаут очистки устаревшего кэша логов
   */
  private setCleanupCacheTask() {
    setTimeout(async () => {
      await this.cleanupCache();
      this.setCleanupCacheTask();
    }, CLEANUP_TIMEOUT);
  }

  /**
   * Очистить устаревший кэш логов
   */
  private async cleanupCache() {
    if (await exists(this.path)) {
      const filesNames = await readdir(this.path);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < filesNames.length; i++) {
        const filePath = path.resolve(this.path, filesNames[i]);
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
  private async requestCache(buildId: string) {
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
  private async createCache(buildId: string, data: string) {
    const cachePath = this.toCachePath(buildId);

    return writeFile(cachePath, data, { encoding: 'utf-8' });
  }

  /**
   * Возвращает лог по индентификатору билда
   * @param {string} buildId Индентификатор билда
   * @return {Promise}
   */
  public async fetchLogsByBuildId(buildId: string) {
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
