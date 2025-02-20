import { TestBed } from '@angular/core/testing';
import { HelloWorldModule } from './hello-world.module';
import { HelloWorldService } from './hello-world.service';

describe('HelloWorldModule', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HelloWorldModule]
		}).compileComponents();
	});

	it('should create the module', () => {
		const module = TestBed.inject(HelloWorldModule);
		expect(module).toBeTruthy();
	});

	it('should provide HelloWorld service', () => {
		const service = TestBed.inject(HelloWorldService);
		expect(service).toBeTruthy();
	});
});