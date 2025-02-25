//npm test -- dist/services/common/client.module.spec.js                    
import { inject, NgModule, PLATFORM_ID } from "@angular/core";
import { ClientCallbackService } from "./client-callback.service";
import { ClientInfoService } from "./client-info.service";
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [CommonModule],
	providers: [
		{ provide: ClientCallbackService, useFactory: (client: ClientInfoService) => new ClientCallbackService(client), deps: [ClientInfoService] },
		{
			provide: ClientInfoService,
			useFactory: () => {
				const platform = inject(PLATFORM_ID);
				return new ClientInfoService(platform);
			},
			deps: [PLATFORM_ID],
		},
	]
})
export class ClientModule { }



