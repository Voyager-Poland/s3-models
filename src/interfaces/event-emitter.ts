import { get } from "http";

export interface EventEmitter<T> {
	emitEvent(event: T): void;
	get getCurrentValue(): T;
}


