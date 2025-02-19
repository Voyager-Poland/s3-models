import { StateSaverService } from './state-saver.service';
import { EventReader } from '../interfaces/event-reader';
import { Subject } from 'rxjs';
import { Store } from '../interfaces/store';
import { jest } from '@jest/globals';

describe('StateSaverService', () => {
	let service: StateSaverService<string>;
	let store: Store<string>;
	let reader: EventReader<string>;
	let eventSubject: Subject<string>;

	beforeEach(() => {
		eventSubject = new Subject<string>();

		store = {
			getValue: jest.fn<() => string>(),
			setValue: jest.fn()
		};

		reader = {
			event$: eventSubject.asObservable()
		};

		service = new StateSaverService<string>(store, reader);
	});

	it('should start and save state on event emission', () => {
		service.start();
		eventSubject.next('test-state');
		expect(store.setValue).toHaveBeenCalledWith('test-state');
	});

	it('should unsubscribe from the event stream', () => {
		service.start();
		service.unsubscribe();
		eventSubject.next('test-state');
		expect(store.setValue).not.toHaveBeenCalledWith('test-state');
	});

	it('should call unsubscribe on destroy', () => {
		service.start();
		const unsubscribeSpy = jest.spyOn(service, 'unsubscribe');
		service.destroy();
		expect(unsubscribeSpy).toHaveBeenCalled();
	});
});