import { TestBed } from '@angular/core/testing';
import { LanguageStoreModule } from './language-store.module';
import { LANGUAGE_STORE, LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN, LANGUAGE_STATE_INITIALIZER_TOKEN, LANGUAGE_STATE_SAVER_TOKEN, LANGUAGE_STATE_COMPARSION_TOKEN } from '../tokens/tokens';
import { CookieStore } from './cookie-store';
import { SSRStore } from './ssr-store';
import { ClientInfoService } from '../common/client-info.service';
import { IntialStateService } from './initial-state.service';
import { StateInitializerService } from '../services/state-initializer.service';
import { StateSaverService } from '../services/state-saver.service';
import { StateComparisonService, StateComparisonStructure } from './state-comparison.service';
import { LanguageEventEmitter } from '../context/language-event-emitter';
import { LanguageEventReader } from '../context/language-event-reader';

describe('LanguageStoreModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LanguageStoreModule.forRoot('language')],
            providers: [
                { provide: ClientInfoService, useValue: { isBrowser: () => true } }
            ]
        });
    });

    it('should provide LANGUAGE_STORE as CookieStore in browser', () => {
        const store = TestBed.inject(LANGUAGE_STORE);
        expect(store).toBeInstanceOf(CookieStore);
    });

    it('should provide LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN', () => {
        const initialStateProvider = TestBed.inject(LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN);
        expect(initialStateProvider).toBeInstanceOf(IntialStateService);
    });

    it('should provide LANGUAGE_STATE_INITIALIZER_TOKEN', () => {
        const stateInitializer = TestBed.inject(LANGUAGE_STATE_INITIALIZER_TOKEN);
        expect(stateInitializer).toBeInstanceOf(StateInitializerService);
    });

    it('should provide LANGUAGE_STATE_SAVER_TOKEN', () => {
        const stateSaver = TestBed.inject(LANGUAGE_STATE_SAVER_TOKEN);
        expect(stateSaver).toBeInstanceOf(StateSaverService);
    });

    it('should provide LANGUAGE_STATE_COMPARSION_TOKEN as StateComparisonStructure by default', () => {
        const stateComparison = TestBed.inject(LANGUAGE_STATE_COMPARSION_TOKEN);
        expect(stateComparison).toBeInstanceOf(StateComparisonStructure);
    });

    it('should provide LANGUAGE_STATE_COMPARSION_TOKEN as StateComparisonService when intervalValue is provided', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [LanguageStoreModule.forRoot('language', {}, 1000)],
            providers: [
                { provide: ClientInfoService, useValue: { isBrowser: () => true } }
            ]
        });

        const stateComparison = TestBed.inject(LANGUAGE_STATE_COMPARSION_TOKEN);
        expect(stateComparison).toBeInstanceOf(StateComparisonService);
    });
});
