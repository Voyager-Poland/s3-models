import { TestBed } from '@angular/core/testing';
import { LanguageEventModule } from './language-event.module';
import { LanguageEventBusService } from './language-bus.service';
import { LanguageEventReader } from './language-event-reader';
import { LanguageEventEmitter } from './language-event-emitter';

describe('LanguageEventModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LanguageEventModule.forRoot()],
            providers: [LanguageEventBusService]
        });
    });

    it('should provide LanguageEventReader', () => {
        const reader = TestBed.inject(LanguageEventReader);
        expect(reader).toBeTruthy();
    });

    it('should provide LanguageEventEmitter', () => {
        const emitter = TestBed.inject(LanguageEventEmitter);
        expect(emitter).toBeTruthy();
    });
});
