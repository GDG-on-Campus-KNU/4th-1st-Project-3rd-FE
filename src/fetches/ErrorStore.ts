export default class ErrorStore<E extends Error = Error> {
  #lastError: E | null = null;
  #listeners: (() => void)[] = [];

  setLastError(error: E) {
    this.#lastError = error;
    this.#listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }

  getSnapshot() {
    return this.#lastError;
  }
}
