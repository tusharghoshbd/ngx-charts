import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InstallationComponent } from './installation/installation.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { LineComponent } from './line/line.component';

import { ngxChartsBarModule, ngxChartsLineModule, ngxChartsPieModule } from '@tusharghoshbd/ngx-charts';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        InstallationComponent,
        BarComponent,
        PieComponent,
        LineComponent
    ],
    imports: [
        BrowserModule,
        ngxChartsBarModule,
        ngxChartsLineModule,
        ngxChartsPieModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
