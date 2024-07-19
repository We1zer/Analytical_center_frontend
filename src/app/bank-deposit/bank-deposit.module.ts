import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankDepositListComponent } from './bank-deposit-list/bank-deposit-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BankDepositListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BankDepositModule { }
