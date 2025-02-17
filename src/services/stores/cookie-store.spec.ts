import { CookieStore } from './cookie-store';

interface TestObject {
  name: string;
  greet: () => string;
}

describe('CookieStore', () => {
  let store: CookieStore<TestObject>;
  const key = 'testKey';
	const options = {
		maxAge: 3600,
		//domain: 'example.com',
		secure: true
	};

  beforeEach(() => {
    store = new CookieStore<TestObject>(key, options);
    document.cookie = ''; // Clear cookies before each test
  });

  it('should set and get a value', () => {
    const testObject: TestObject = {
      name: 'John',
      greet: function() {
        return `Hello, ${this.name}!`;
      }
    };

    store.setValue(testObject);

    console.log('Test object set:', testObject);
    const savedObject = store.getValue();
    console.log('Saved object retrieved:', savedObject);
    expect(savedObject).toBeDefined();
    expect(savedObject.name).toBe('John');
    expect(savedObject.greet()).toBe('Hello, John!');
  });

  it('should handle maxAge, domain, and secure options', () => {
    const testObject: TestObject = { name: 'John', greet: () => 'Hello' };
    store.setValue(testObject);

    const cookieString = document.cookie;
    console.log('Cookie string:', cookieString);
    expect(cookieString).toContain(`${key}=`);
    expect(cookieString).toContain('max-age=3600');
    expect(cookieString).toContain('domain=example.com');
    expect(cookieString).toContain('secure');
  });

  it('should return null if the cookie does not exist', () => {
    const value = store.getValue();
    console.log('Value retrieved for non-existent cookie:', value);
    expect(value).toBeNull();
  });

  it('should serialize and deserialize functions', () => {
    const testObject: TestObject = {
      name: 'John',
      greet: function() {
        return `Hello, ${this.name}!`;
      }
    };

    store.setValue(testObject);

    const savedObject = store.getValue();
    console.log('Saved object with function retrieved:', savedObject);
    expect(savedObject).toBeDefined();
    expect(savedObject.greet()).toBe('Hello, John!');
  });
});