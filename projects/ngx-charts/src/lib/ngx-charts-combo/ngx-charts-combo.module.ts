import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsComboComponent } from "./ngx-charts-combo.component";
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [ngxChartsComboComponent],
    imports: [CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
    exports: [ngxChartsComboComponent],
    providers: [],
})
export class ngxChartsComboModule { }
