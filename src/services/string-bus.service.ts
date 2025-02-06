import { EventBus } from '../abstract/event-bus';

/**
 * Service for managing string events.
 * 
 * Extends the EventBus class to handle events of type string.
 */
export class StringEventBusService extends EventBus<string> {
  /**
   * Creates an instance of StringEventBusService.
   * Initializes the EventBus with an empty string.
   */
  constructor() {
    super(''); // Call the constructor of the abstract class with an initial empty string value
  }
}
