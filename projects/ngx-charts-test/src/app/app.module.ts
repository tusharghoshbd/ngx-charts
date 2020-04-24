import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ngxChartsBarVerticalModule } from './ngx-charts-bar-vertical/ngx-charts-bar-vertical.module';

import { AxesModule } from './axes/axes.module';
import { HeaderModule } from './header/header.module';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ngxChartsBarVerticalModule,
        AxesModule,
        HeaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
