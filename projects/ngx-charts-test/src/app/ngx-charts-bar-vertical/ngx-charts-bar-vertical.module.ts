import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from './../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { TooltipDirective } from '../tooltip/tooltip.directive';

import { ngxChartsBarVerticalComponent } from "./ngx-charts-bar-vertical.component";


@NgModule({
    declarations: [ngxChartsBarVerticalComponent, TooltipDirective],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule],
    exports: [ngxChartsBarVerticalComponent],
    providers: [],
})
export class ngxChartsBarVerticalModule { }
