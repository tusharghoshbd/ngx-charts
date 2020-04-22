import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from './../axes/axes.module';

import { ngxChartsBarVerticalComponent } from "./ngx-charts-bar-vertical.component";

@NgModule({
    declarations: [ngxChartsBarVerticalComponent],
    imports: [CommonModule, AxesModule],
    exports: [ngxChartsBarVerticalComponent],
    providers: [],
})
export class ngxChartsBarVerticalModule { }
