import { ProfileTokenModel } from './profile.token.model';

describe('ProfileTokenModel', () => {
  it('should create an instance with default values', () => {
    const model = new ProfileTokenModel();
    expect(model.token).toBeUndefined();
    expect(model.initials).toBeUndefined();
    expect(model.profilePictureUri).toBeUndefined();
    expect(model.isLogged).toBe(false);
  });

  it('should create an instance with provided values', () => {
    const model = new ProfileTokenModel({
      token: 'test-token',
      initials: 'TT',
      profilePictureUri: 'http://example.com/pic.jpg'
    });
    expect(model.token).toBe('test-token');
    expect(model.initials).toBe('TT');
    expect(model.profilePictureUri).toBe('http://example.com/pic.jpg');
    expect(model.isLogged).toBe(true);
  });

  it('should return true for isNotLogged when token is empty', () => {
    const model = new ProfileTokenModel({ token: '' });
    expect(model.isLogged).toBe(false);
  });

  it('should return false for isNotLogged when token is not empty', () => {
    const model = new ProfileTokenModel({ token: 'test-token' });
    expect(model.isLogged).toBe(true);
  });

  it('should create an empty instance using static Empty method', () => {
    const model = ProfileTokenModel.createEmpty();
    expect(model.token).toBe('');
    expect(model.initials).toBe('');
    expect(model.profilePictureUri).toBe('');
    expect(model.isLogged).toBe(false);
  });
 });