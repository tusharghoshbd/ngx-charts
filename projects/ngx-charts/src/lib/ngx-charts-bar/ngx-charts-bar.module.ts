import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import { ngxChartsBarComponent } from "./ngx-charts-bar.component";


@NgModule({
    declarations: [ngxChartsBarComponent],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule, TooltipModule],
    exports: [ngxChartsBarComponent],
    providers: [],
})
export class ngxChartsBarModule { }
