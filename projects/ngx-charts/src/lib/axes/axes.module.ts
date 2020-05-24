import { NgModule } from '@angular/core';
import { XAxisComponent } from './x-axis/x-axis.component';
import { YAxisComponent } from './y-axis/y-axis.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [XAxisComponent, YAxisComponent],
  exports: [XAxisComponent, YAxisComponent]
})
export class AxesModule {}
