import { ProfileTokenModel } from '../../models/profile.token.model';
import { CookieStore } from './cookie-store';



describe('CookieStore', () => {
  let store: CookieStore<ProfileTokenModel>;
  const key = 'testKey';
	const options = {
		maxAge: 3600,
		domain: 'localhost',
		secure: false
	};

  beforeEach(() => {
    store = new CookieStore<ProfileTokenModel>(key, options);
    document.cookie = ''; // Clear cookies before each test
  });

  it('should set and get a value', () => {
    var testObject: ProfileTokenModel =  new  ProfileTokenModel( {
			token: 'test-token',
			initials: 'TT',
			profilePictureUri: 'http://example.com/pic.jpg'
    });

    store.setValue(testObject);

    console.log('Test object set:', testObject);
    const savedObject = store.getValue();
    console.log('Saved object retrieved:', savedObject);
    expect(savedObject).toBeDefined();
    expect(savedObject.token).toBe('test-token');	
    expect(savedObject.isLogged).toBe(true);
  });



});