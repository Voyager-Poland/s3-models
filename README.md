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

The `EventEmitter` interface defines methods for emitting events and getting the current value of the event stream.

```typescript
export interface EventEmitter<T> {
  emitEvent(event: T): void;
  get getCurrentValue(): T;
}

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
import { InjectionToken } from '@angular/core';
import { Translation } from 's3-models';

export const TRANSLATION_TOKEN = new InjectionToken<Translation>('Translation');

```

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileEventBusService, LanguageEventBusService, CurrencyEventBusService, StringEventBusService, ProfilEventEmiter, ProfilEventReader, LanguageEventEmitter, LanguageEventReader, CurrencyEventEmitter, CurrencyEventReader } from 's3-models';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
		ProfileEventBusService,
		{ provide: ProfilEventEmiter, useFactory: (profileService: ProfileEventBusService) => new ProfilEventEmiter(profileService), deps: [ProfileEventBusService] },
		{ provide: ProfilEventReader, useFactory: (profileService: ProfileEventBusService) => new ProfilEventReader(profileService), deps: [ProfileEventBusService] },
		CurrencyEventBusService,
		{ provide: CurrencyEventEmitter, useFactory: (currencyService: CurrencyEventBusService) => new CurrencyEventEmitter(currencyService), deps: [CurrencyEventBusService] },
		{ provide: CurrencyEventReader, useFactory: (currencyService: CurrencyEventBusService) => new CurrencyEventReader(currencyService), deps: [CurrencyEventBusService] },
		LanguageEventBusService,
		{ provide: LanguageEventEmitter, useFactory: (languageService: LanguageEventBusService) => new LanguageEventEmitter(languageService), deps: [LanguageEventBusService] },
		{ provide: LanguageEventReader, useFactory: (languageService: LanguageEventBusService) => new LanguageEventReader(languageService), deps: [LanguageEventBusService] },
		{ provide: TRANSLATION_TOKEN, useClass: TranslationService },
		{ provide: LanguageTranslationService, useFactory: (languageEventReader: LanguageEventReader, translation: TranslationService) => new LanguageTranslationService(languageEventReader, translation), deps: [LanguageEventReader, TranslationService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### LanguageTranslationService

The `LanguageTranslationService` class provides methods for managing language translations and reacting to language changes.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { LanguageTranslationService } from 's3-models';

constructor(
  private languageTranslationService: LanguageTranslationService
) {
  this.languageTranslationService.language$.subscribe(language => {
    console.log('Language changed:', language);
  });

  const translatedText = this.languageTranslationService.translate('HELLO');
  console.log(translatedText); // Output: HELLO-translated

  this.languageTranslationService.getTranslation$('HELLO').subscribe(translated => {
    console.log(translated); // Output: HELLO-translated
  });
}
```


### CurrencyEventBusService

The `CurrencyEventBusService` class extends the `EventBus` class to handle events of type `string`, with 'PLN' as the default currency.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { CurrencyEventBusService, CurrencyEventEmitter, CurrencyEventReader } from 's3-models';

constructor(
  @Inject('CurrencyEventEmitter') private currencyEventEmitter: CurrencyEventEmitter,
  @Inject('CurrencyEventReader') private currencyEventReader: CurrencyEventReader
) {
  this.currencyEventReader.event$.subscribe(currency => {
    console.log('Currency changed:', currency);
  });

  this.currencyEventEmitter.emitEvent('USD');
}
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
### ProfileEventBusService

The `ProfileEventBusService` class extends the `EventBus` class to handle events of type `ProfileTokenModel`.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { ProfileTokenModel, ProfilEventEmiter, ProfilEventReader } from 's3-models';

constructor(
  @Inject('ProfileEventEmitter') private profileEventEmitter: ProfilEventEmiter,
  @Inject('ProfileEventReader') private profileEventReader: ProfilEventReader
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
### CurrencyEventBusService

The `CurrencyEventBusService` class extends the `EventBus` class to handle events of type `string`, with 'PLN' as the default currency.

Example usage:

```typescript
import { Inject } from '@angular/core';
import { CurrencyEventEmitter, CurrencyEventReader } from 's3-models';

constructor(
  @Inject('CurrencyEventEmitter') private currencyEventEmitter: CurrencyEventEmitter,
  @Inject('CurrencyEventReader') private currencyEventReader: CurrencyEventReader
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

This project is licensed under the MTI License.
