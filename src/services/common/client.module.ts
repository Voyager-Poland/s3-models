//npm test -- dist/services/common/client.module.spec.js                    
import { inject, NgModule, PLATFORM_ID } from "@angular/core";
import { ClientCallbackService } from "./client-callback.service";
import { ClientInfoService } from "./client-info.service";
import { CLIENT_INFO_TOKEN } from "../../tokens/tokens";
import { ClientInfo } from "../../interfaces/client-info";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [ClientCallbackService],
	imports: [CommonModule],
	providers: [
		{ provide: ClientCallbackService, useFactory: (client: ClientInfo) => new ClientCallbackService(client), deps: [CLIENT_INFO_TOKEN] },
		{
			provide: CLIENT_INFO_TOKEN,
			useFactory: () => {
				const platform = inject(PLATFORM_ID);
				return new ClientInfoService(platform);
			},
			deps: [PLATFORM_ID],
		},
	],
	exports: [ClientCallbackService]
})
export class ClientModule { }



