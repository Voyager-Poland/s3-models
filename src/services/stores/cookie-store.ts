import { Store } from '../../interfaces/store';

interface CookieOptions {
  maxAge?: number;
  domain?: string;
  secure?: boolean;
}

export class CookieStore<T> implements Store<T> {
  constructor(private key: string, private options: CookieOptions = {}) {}

  getValue(): T {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${this.key}=`))
      ?.split('=')[1];

    if (cookieValue) {
      console.log(`Cookie value found: ${cookieValue}`);
      return this.deserialize(decodeURIComponent(cookieValue));
    }

    console.log(`Cookie with key "${this.key}" not found.`);
    return null as unknown as T;
  }

  setValue(value: T): void {
    const cookieValue = encodeURIComponent(this.serialize(value));
    let cookieString = `${this.key}=${cookieValue}; path=/;`;

    if (this.options.maxAge) {
      cookieString += ` max-age=${this.options.maxAge};`;
    }

    if (this.options.domain) {
      cookieString += ` domain=${this.options.domain};`;
    }

    if (this.options.secure) {
      cookieString += ' secure;';
    }

    document.cookie = cookieString;
    console.log(`Cookie set: ${cookieString}`);
  }

  private serialize(value: T): string {
    return JSON.stringify(value, this.replacer);
  }

  private deserialize(value: string): T {
    return JSON.parse(value, this.reviver);
  }

  private replacer(key: string, value: any): any {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  }

  private reviver(key: string, value: any): any {
    if (typeof value === 'string' && value.startsWith('function')) {
      return new Function(`return ${value}`)();
    }
    return value;
  }
}