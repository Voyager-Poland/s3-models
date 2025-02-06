import { EventBus } from '../abstract/event-bus';

export class StringEventBusService extends EventBus<string> {
  constructor() {
    super(''); // Call the constructor of the abstract class with an initial empty string value
  }
}


