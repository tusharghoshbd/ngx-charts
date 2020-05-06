import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ngxChartsBarModule } from './ngx-charts-bar/ngx-charts-bar.module';

import { AxesModule } from './axes/axes.module';
import { HeaderModule } from './header/header.module';

import { LegendModule } from './legend/legend.module';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ngxChartsBarModule,
        AxesModule,
        HeaderModule,
        LegendModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
