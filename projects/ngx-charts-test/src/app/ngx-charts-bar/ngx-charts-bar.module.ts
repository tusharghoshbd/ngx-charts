import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { TooltipDirective } from '../tooltip/tooltip.directive';

import { ngxChartsBarComponent } from "./ngx-charts-bar.component";


@NgModule({
    declarations: [ngxChartsBarComponent, TooltipDirective],
    imports: [CommonModule, AxesModule, HeaderModule,LegendModule],
    exports: [ngxChartsBarComponent],
    providers: [],
})
export class ngxChartsBarModule { }
