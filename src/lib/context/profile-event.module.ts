import { NgModule } from '@angular/core';
import { ProfileEventReader } from './profile-event-reader';
import { ProfileEventBusService } from './profile-bus.service';
import { ProfileEventEmitter } from './profile-event-emitter';

export function createProfileEventReader(service: ProfileEventBusService): ProfileEventReader {
	return new ProfileEventReader(service);
}

export function createProfileEventEmitter(service: ProfileEventBusService): ProfileEventEmitter {
	return new ProfileEventEmitter(service);
}

@NgModule({
	providers: [
		{ provide: ProfileEventBusService, useClass: ProfileEventBusService, multi: false },
		{
			provide: ProfileEventReader,
			useFactory: createProfileEventReader,
			deps: [ProfileEventBusService],

		},
		{
			provide: ProfileEventEmitter,
			useFactory: createProfileEventEmitter,
			deps: [ProfileEventBusService]
		}
	]
})
export class ProfileEventModule { }
