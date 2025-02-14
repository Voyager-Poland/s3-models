import { EventEmitter } from '../interfaces/event-emitter';
import { ReadState } from '../interfaces/read-state';

export class StateInitializerService<T> {
  constructor(private initialState: ReadState<T>, private emitter: EventEmitter<T>) {}

  public setState(): void {
    this.emitter.emitEvent(this.initialState.getInitialState());
  }
}