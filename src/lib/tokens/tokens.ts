import { InjectionToken } from "@angular/core";
import { ClientInfo } from "../interfaces/client-info";
import { ProfileTokenModel } from "../models/profile.token.model";
import { Store } from "../interfaces/store";
import { InitialStateProvider } from "../interfaces/internal-state.provider";
import { StateSaverService } from "../services/state-saver.service";
import { StateInitializerService } from "../services/state-initializer.service";
import { StateComparisonService } from "../stores/state-comparison.service";

export const CLIENT_INFO_TOKEN = new InjectionToken<ClientInfo>('ClientInfo');
export const PROFILE_STORE = new InjectionToken<Store<ProfileTokenModel>>('ProfileStore');
export const PROFILE_INITIAL_STATE_PROVIDER_TOKEN = new InjectionToken<InitialStateProvider<ProfileTokenModel>>('InitialStateProvider<ProfileTokenModel>');
export const PROFILE_STATE_SAVER_TOKEN = new InjectionToken<StateSaverService<ProfileTokenModel>>('StateSaver<ProfileTokenModel>');
export const PROFILE_STATE_INITIALIZER_TOKEN = new InjectionToken<StateInitializerService<ProfileTokenModel>>('ProfieStateInitializerServic');
export const PROFILE_STATE_COMPARSION_TOKEN = new InjectionToken<StateComparisonService<ProfileTokenModel>>('ProfileStateComparer');

export const LANGUAGE_STORE = new InjectionToken<Store<string>>('LanguageStore');

export const LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN = new InjectionToken<InitialStateProvider<string>>('LanguageInitialStateProvider<string>');
export const LANGUAGE_STATE_SAVER_TOKEN = new InjectionToken<StateSaverService<string>>('LanguageStateSaver<string>');
