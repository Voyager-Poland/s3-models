import { ProfileEventBusService } from './profile-bus.service';
import { ProfileTokenModel } from '../models/profile.token.model';

describe('ProfileEventBusService', () => {
  let service: ProfileEventBusService;

  beforeEach(() => {
    service = new ProfileEventBusService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit and receive profile changes', () => {
    const profile: ProfileTokenModel = new ProfileTokenModel({
      token: 'test-token',
      initials: 'TT',
      profilePictureUri: 'http://example.com/pic.jpg'
    });

    service.event$.subscribe((receivedProfile) => {
      if (receivedProfile.isLogged) {
        expect(receivedProfile).toEqual(profile);
      }
    });

    service.emitEvent(profile);
    expect(service.getCurrentValue).toEqual(profile); // Check the current value
  });

  it('should initialize with an empty profile', () => {
    service.event$.subscribe((receivedProfile) => {
      expect(receivedProfile).toEqual(ProfileTokenModel.createEmpty());
    });

    expect(service.getCurrentValue).toEqual(ProfileTokenModel.createEmpty()); // Check the initial value
  });
});