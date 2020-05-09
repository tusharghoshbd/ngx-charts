import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ngxChartsBarModule } from './ngx-charts-bar/ngx-charts-bar.module';
import { ngxChartsLineModule } from './ngx-charts-line/ngx-charts-line.module';

import { AxesModule } from './axes/axes.module';
import { HeaderModule } from './header/header.module';
import { LegendModule } from './legend/legend.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ngxChartsBarModule,
        ngxChartsLineModule,
        LegendModule,
        AxesModule,
        HeaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
