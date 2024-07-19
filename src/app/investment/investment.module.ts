import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentListComponent } from './investment-list/investment-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvestmentListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class InvestmentModule { }
