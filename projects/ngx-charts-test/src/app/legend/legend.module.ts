
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendComponent } from './legend.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LegendComponent],
  exports: [LegendComponent]
})
export class LegendModule {}