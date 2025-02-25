import { ModuleWithProviders, NgModule } from '@angular/core';
import { LanguageEventReader } from './language-event-reader';
import { LanguageEventBusService } from './language-bus.service';
import { LanguageEventEmitter } from './language-event-emitter';

export function createLanguageEventReader(service: LanguageEventBusService): LanguageEventReader {
    return new LanguageEventReader(service);
}

export function createLanguageEventEmitter(service: LanguageEventBusService): LanguageEventEmitter {
    return new LanguageEventEmitter(service);
}

@NgModule({
    providers: []
})
export class LanguageEventModule {
    static forRoot(): ModuleWithProviders<LanguageEventModule> {
        return {
            ngModule: LanguageEventModule,
            providers: [
                {
                    provide: LanguageEventReader,
                    useFactory: createLanguageEventReader,
                    deps: [LanguageEventBusService],
                },
                {
                    provide: LanguageEventEmitter,
                    useFactory: createLanguageEventEmitter,
                    deps: [LanguageEventBusService],
                }
            ]
        };
    }
}
