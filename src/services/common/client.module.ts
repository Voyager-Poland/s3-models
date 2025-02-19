import { NgModule } from '@angular/core';
import { ClientCallbackService } from './client-callback.service';
import { ClientInfoService } from './client-info.service';
import { CLIENT_INFO_TOKEN } from '@tokens/tokens';

@NgModule({
	providers: [
		ClientCallbackService,
		{ provide: CLIENT_INFO_TOKEN, useClass: ClientInfoService }
	]
})
export class ClientModule { }