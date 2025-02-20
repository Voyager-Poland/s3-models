import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class HelloWorldService {
	constructor() {
		console.log('Hello World');
	}
	getHelloWorld(): string {
		return 'Hello World';
	}
}


