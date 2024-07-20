import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationHistoryComponent } from './quotation-history/quotation-history.component';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [QuotationHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ]
})
export class QuotationHistoryModule { }
