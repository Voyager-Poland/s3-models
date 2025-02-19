import { InjectionToken } from "@angular/core";
import { ClientInfo } from "../interfaces/client-info";

export const CLIENT_INFO_TOKEN = new InjectionToken<ClientInfo>('ClientInfo');
