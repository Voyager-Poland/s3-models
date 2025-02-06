import { EventBus } from '../abstract/event-bus';

/**
 * Service for managing language events.
 * 
 * Extends the EventBus class to handle events of type string.
 */
export class LanguageEventBusService extends EventBus<string> {
  /**
   * Creates an instance of LanguageEventBusService.
   * Initializes the EventBus with 'pl' as the default language.
   */
  constructor() {
    super('pl'); // Call the constructor of the abstract class with 'pl' as the initial value
  }
}
