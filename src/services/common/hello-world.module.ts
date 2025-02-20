import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HelloWorld } from "./hello-world";
import { CommonModule } from "@angular/common";



@NgModule({
	declarations: [HelloWorld],
	imports: [CommonModule],
	providers: [HelloWorld],
	exports: [HelloWorld]
})
export class HelloWorldModule {
}
