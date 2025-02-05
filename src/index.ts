import { Translation } from './interfaces/translation';
import { ProfileTokenModel } from './models/profile.token.model';
import { ProfileEventBusService } from './services/profile-bus.service';
import { EventBus } from './abstract/event-bus';

// Exporting models
export { ProfileTokenModel } from './models/profile.token.model';

// Exporting interfaces
export { Translation } from './interfaces/translation';

// Exporting services
export { ProfileEventBusService } from './services/profile-bus.service';

// Exporting abstract classes
export { EventBus } from './abstract/event-bus';

// Example usage of the exported components
const profileToken = new ProfileTokenModel({ token: 'test-token', initials: 'TT', profilePictureUri: 'http://example.com/pic.jpg' });

class TranslationService implements Translation {
  translate(key: string, params?: any): string {
    return key;
  }
  setLanguage(lang: string): void {
    console.log(lang);
  }
  getLanguage(): string {
    return 'en';
  }
}

// // Example usage of the ProfileEventBusService
// const profileEventBusService = new ProfileEventBusService();
// profileEventBusService.event$.subscribe(profile => {
//   console.log('Profile changed:', profile);
// });
// profileEventBusService.emitEvent(profileToken);