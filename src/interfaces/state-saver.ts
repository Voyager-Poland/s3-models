export interface StateSaver<T> {
  saveState(value: T): void;
}
