import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsLineComponent } from "./ngx-charts-line.component";
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [ngxChartsLineComponent],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule, TooltipModule],
    exports: [ngxChartsLineComponent],
    providers: [],
})
export class ngxChartsLineModule { }
