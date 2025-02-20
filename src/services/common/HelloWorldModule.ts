import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HelloWorld } from "./HelloWorld";



@NgModule({
	declarations: [HelloWorld],
	imports: [BrowserModule],
	providers: [HelloWorld],
	exports: [HelloWorld]
})
export class HelloWorldModule {
}
