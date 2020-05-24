import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsPieComponent } from "./ngx-charts-pie.component";
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [ngxChartsPieComponent],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule, TooltipModule],
    exports: [ngxChartsPieComponent],
    providers: [],
})
export class ngxChartsPieModule { }
