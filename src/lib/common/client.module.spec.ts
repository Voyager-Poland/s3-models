import { TestBed } from '@angular/core/testing';
import { ClientModule } from './client.module';
import { ClientCallbackService } from './client-callback.service';
import { ClientInfoService } from './client-info.service';
import { CLIENT_INFO_TOKEN } from '../tokens/tokens';

describe('ClientModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientModule]
    });
  });

  it('should provide ClientCallbackService', () => {
    const clientCallback = TestBed.inject(ClientCallbackService);
    expect(clientCallback).toBeTruthy();
  });

  it('should provide CLIENT_INFO_TOKEN mapped to ClientInfoService', () => {
    const clientInfo = TestBed.inject(CLIENT_INFO_TOKEN);
    expect(clientInfo).toBeTruthy();
    expect(clientInfo instanceof ClientInfoService).toBe(true);
  });
});