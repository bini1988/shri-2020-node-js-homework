
/**
 * Очередь
 */
class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * Размер очеренди
   * @return {number}
   */
  get size() {
    return this.items.length;
  }

  /**
   * Очередь пуста
   * @return {boolean}
   */
  get isEmpty() {
    return !this.size;
  }

  /**
   * Очистить очередь
   */
  clear() {
    this.items = [];
  }

  /**
   * Добавить элемент в очередь
   * @param {Any} data Элемент очереди
   */
  enqueue(data) {
    this.items.push(data);
  }

  /**
   * Удалить элемент из очереди
   * @return {Any}
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * Вернуть элемент из начала очереди
   * @return {Any}
   */
  front() {
    return this.items[0];
  }

  /**
   * Вернуть элемент из конца очереди
   * @return {Any}
   */
  back() {
    return this.items[this.size - 1];
  }
}

module.exports = Queue;
