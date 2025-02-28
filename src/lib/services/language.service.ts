import { LanguageEventEmitter } from '../context/language-event-emitter';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { generateRandomString } from '../utils/string-utils';
import { Inject, Injectable } from '@angular/core';
import { LANGUAGE_STATE_COMPARSION_TOKEN, LANGUAGE_STATE_INITIALIZER_TOKEN, LANGUAGE_STATE_SAVER_TOKEN } from '../tokens/tokens';

@Injectable({
    providedIn: 'root',
    deps: [LANGUAGE_STATE_INITIALIZER_TOKEN, LANGUAGE_STATE_SAVER_TOKEN, LanguageEventEmitter, LANGUAGE_STATE_COMPARSION_TOKEN]
})
export class LanguageService {

    /** 
    @obsolete delete it after testing
    */
    checkIstance: string;

    constructor(
        @Inject(LANGUAGE_STATE_INITIALIZER_TOKEN) private stateInitializer: StateInitializerService<string>,
        @Inject(LANGUAGE_STATE_SAVER_TOKEN) private stateSaver: StateSaverService<string>,
        private emitter: LanguageEventEmitter,
        @Inject(LANGUAGE_STATE_COMPARSION_TOKEN) private stateComparer: StateComparisonStructure<string>) {
        this.checkIstance = generateRandomString(16);
        this.stateInitializer.setState();
        this.stateSaver.start();
        this.stateComparer.start();
    }

    destroy(): void {
        this.stateComparer.stop();
        this.stateSaver.destroy();
        this.emitter.complete();
    }

    onLanguageChange(language: string) {
        this.emitter.emitEvent(language);
    }
}
