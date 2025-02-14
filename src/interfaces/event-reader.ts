import { Observable } from 'rxjs';

/**
 * Interface for event readers.
 * Provides a method to get the observable event stream.
 */
export interface EventReader<T> {
  /**
   * Gets the observable event stream.
   * @returns Observable<T> - The observable event stream.
   */
  readonly event$: Observable<T>;
}