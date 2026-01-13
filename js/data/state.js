export class State {
  constructor() {
    this.data = {};
  }
  set(key, value) {
    this.data[key] = value;
  }
  get(key, fallback = null) {
    return this.data[key] ?? fallback;
  }
}
