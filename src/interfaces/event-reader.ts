import { Observable } from 'rxjs';

export interface EventReader<T> {
  readonly event$: Observable<T>;
}