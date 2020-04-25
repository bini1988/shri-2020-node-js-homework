
export default class Queue<T> {
  private items: Array<T>

  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  get isEmpty() {
    return !this.size;
  }

  clear() {
    this.items = [];
  }

  enqueue(data: T) {
    this.items.push(data);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  back() {
    return this.items[this.size - 1];
  }
}
