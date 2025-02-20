import { ProfileEventEmitter } from "./context/profile-event-emitter";

export class ProfileTokenValue {
	constructor(private emitter: ProfileEventEmitter) { }
	getValue(): string {
		return this.emitter.getCurrentValue.token;
	}
}
