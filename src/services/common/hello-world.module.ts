import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HelloWorldService } from "./hello-world.service";
import { CommonModule } from "@angular/common";



@NgModule({
	declarations: [HelloWorldService],
	imports: [CommonModule],
	providers: [HelloWorldService],
	exports: [HelloWorldService]
})
export class HelloWorldModule {
}
