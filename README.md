# s3-models

## Overview

`s3-models` is a library that provides models, interfaces, and services for managing events and data in Angular applications. It includes support for profile tokens, translations, and event buses for managing language and currency events.

## Installation

To install the library, use npm:

```sh
npm install s3-models
```

## Models

### ProfileTokenModel

The `ProfileTokenModel` class represents a profile token with the following properties:

- `token`: The token associated with the profile.
- `initials`: The initials of the profile.
- `profilePictureUri`: The URI of the profile picture (optional).

Example usage:

```typescript
import { ProfileTokenModel } from 's3-models';

const profile = new ProfileTokenModel({
  token: 'test-token',
  initials: 'TT',
  profilePictureUri: 'http://example.com/pic.jpg'
});

console.log(profile.isLogged); // Output: true
```

## Interfaces

### Translation

The `Translation` interface defines methods for translating keys and managing language settings.

### EventEmitter

The `EventEmitter` interface defines a method for emitting events.

```typescript
export interface EventEmitter<T> {
  emitEvent(event: T): void;
}
```

### EventReader

The `EventReader` interface defines a property for reading events.

```typescript
import { Observable } from 'rxjs';

export interface EventReader<T> {
  readonly event$: Observable<T>;
}
```

## Services

### Registering Services in Angular DI

To use the services provided by `s3-models` in your Angular application, you need to register them in your Angular module's `providers` array.

Example:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileEventBusService, LanguageEventBusService, CurrencyEventBusService, StringEventBusService } from 's3-models';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: 'ProfileEventEmitter', useExisting: ProfileEventBusService },
    { provide: 'ProfileEventReader', useExisting: ProfileEventBusService },
    { provide: 'LanguageEventEmitter', useExisting: LanguageEventBusService },
    { provide: 'LanguageEventReader', useExisting: LanguageEventBusService },
    { provide: 'CurrencyEventEmitter', useExisting: CurrencyEventBusService },
    { provide: 'CurrencyEventReader', useExisting: CurrencyEventBusService },
    { provide: 'StringEventEmitter', useExisting: StringEventBusService },
    { provide: 'StringEventReader', useExisting: StringEventBusService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### ProfileEventBusService

The `ProfileEventBusService` class extends the `EventBus` class to handle events of type `ProfileTokenModel`.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { ProfileEventBusService, ProfileTokenModel } from 's3-models';

constructor(
  @Inject('ProfileEventEmitter') private profileEventEmitter: ProfileEventBusService,
  @Inject('ProfileEventReader') private profileEventReader: ProfileEventBusService
) {
  this.profileEventReader.event$.subscribe(profile => {
    console.log('Profile changed:', profile);
  });

  const newProfile = new ProfileTokenModel({
    token: 'new-token',
    initials: 'NT',
    profilePictureUri: 'http://example.com/new-pic.jpg'
  });
  this.profileEventEmitter.emitEvent(newProfile);
}
```

### LanguageEventBusService

The `LanguageEventBusService` class extends the `EventBus` class to handle events of type `string`, with 'pl' as the default language.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { LanguageEventBusService } from 's3-models';

constructor(
  @Inject('LanguageEventEmitter') private languageEventEmitter: LanguageEventBusService,
  @Inject('LanguageEventReader') private languageEventReader: LanguageEventBusService
) {
  this.languageEventReader.event$.subscribe(language => {
    console.log('Language changed:', language);
  });

  this.languageEventEmitter.emitEvent('en');
}
```

### CurrencyEventBusService

The `CurrencyEventBusService` class extends the `EventBus` class to handle events of type `string`, with 'PLN' as the default currency.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { CurrencyEventBusService } from 's3-models';

constructor(
  @Inject('CurrencyEventEmitter') private currencyEventEmitter: CurrencyEventBusService,
  @Inject('CurrencyEventReader') private currencyEventReader: CurrencyEventBusService
) {
  this.currencyEventReader.event$.subscribe(currency => {
    console.log('Currency changed:', currency);
  });

  this.currencyEventEmitter.emitEvent('USD');
}
```

### StringEventBusService

The `StringEventBusService` class extends the `EventBus` class to handle events of type `string`.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { StringEventBusService } from 's3-models';

constructor(
  @Inject('StringEventEmitter') private stringEventEmitter: StringEventBusService,
  @Inject('StringEventReader') private stringEventReader: StringEventBusService
) {
  this.stringEventReader.event$.subscribe(event => {
    console.log('Event received:', event);
  });

  this.stringEventEmitter.emitEvent('Hello, World!');
}
```

## Abstract Classes

### EventBus

The `EventBus` class is an abstract class that provides a mechanism for emitting and subscribing to events of type `T`. It uses RxJS's `BehaviorSubject` to manage the event stream.

## License

This project is licensed under the ISC License.
