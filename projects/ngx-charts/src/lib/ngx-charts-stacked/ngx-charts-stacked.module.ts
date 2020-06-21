import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import { ngxChartsStackedComponent } from "./ngx-charts-stacked.component";


@NgModule({
    declarations: [ngxChartsStackedComponent],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule, TooltipModule],
    exports: [ngxChartsStackedComponent],
    providers: [],
})
export class ngxChartsStackedModule { }
