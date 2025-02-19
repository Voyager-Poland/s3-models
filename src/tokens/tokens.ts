import { InjectionToken } from "@angular/core";
import { ClientInfo } from "@interfaces/client-info";
import { InitialStateProvider } from "@interfaces/internal-state.provider";
import { Store } from "@interfaces/store";
import { ProfileTokenModel } from "@models/profile.token.model";
import { StateInitializerService } from "@services/state-initializer.service";
import { StateSaverService } from "@services/state-saver.service";
import { StateComparisonService } from "@services/stores/state-comparison.service";

export const CLIENT_INFO_TOKEN = new InjectionToken<ClientInfo>('ClientInfo');
