import { EventBus } from '../abstract/event-bus';

/**
 * Service for managing currency events.
 * 
 * Extends the EventBus class to handle events of type string.
 */
export class CurrencyEventBusService extends EventBus<string> {
  /**
   * Creates an instance of CurrencyEventBusService.
   * Initializes the EventBus with 'PLN' as the default currency.
   */
  constructor() {
    super('PLN'); // Call the constructor of the abstract class with 'PLN' as the initial value
  }
}


