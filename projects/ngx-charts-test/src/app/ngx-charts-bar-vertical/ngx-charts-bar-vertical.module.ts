import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ngxChartsBarVerticalComponent } from "./ngx-charts-bar-vertical.component";

@NgModule({
  declarations: [ngxChartsBarVerticalComponent],
  imports: [CommonModule],
  exports: [ngxChartsBarVerticalComponent],
  providers: [],
})
export class ngxChartsBarVerticalModule {}
