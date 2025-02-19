import { Store } from "../../interfaces/store";

export class SSRStore<T> implements Store<T> {
	private store?: T


	getValue(): T {
		return this.store as T;
	}

	setValue(value: T): void {
		this.store = value;
	}
}

