import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InstallationComponent } from './installation/installation.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { LineComponent } from './line/line.component';
import { ComboComponent } from './combo/combo.component';

import { ngxChartsBarModule, ngxChartsLineModule, ngxChartsComboModule, ngxChartsPieModule, ngxChartsStackedModule } from 'ngx-charts';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        InstallationComponent,
        BarComponent,
        PieComponent,
        LineComponent,
        ComboComponent
    ],
    imports: [
        BrowserModule,
        ngxChartsBarModule,
        ngxChartsLineModule,
        ngxChartsComboModule,
        ngxChartsPieModule,
        ngxChartsStackedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
