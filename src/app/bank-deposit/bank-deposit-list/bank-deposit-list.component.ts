import { Component } from '@angular/core';
import { BankDepositService } from '../bank-deposit.service';
import { BankDeposit } from 'src/app/models/bank-deposit';
import { Client } from 'src/app/models/client';



@Component({
  selector: 'app-bank-deposit-list',
  templateUrl: './bank-deposit-list.component.html',
  styleUrls: ['./bank-deposit-list.component.css']
})
export class BankDepositListComponent {
  bankDeposits: BankDeposit[] = [];
  client: Client | null = null;
  selectedBankDeposit: BankDeposit | null = null;
  selectedBankDepositForDeletion: BankDeposit | null = null;
  clientName: string | null = null;
  clients: { [key: string]: string } = {};

  constructor(private bankDepositService: BankDepositService) {}
  ngOnInit(): void {
      this.bankDepositService.getBankDeposits().subscribe((data: any) => {
        this.bankDeposits = data.data;

       
        this.bankDeposits.forEach(deposit => {
          this.getClientName(deposit.client);  
        });

        console.log('Loaded bank deposits:', this.bankDeposits);
      });
    }

   getClientName(clientId: string): void {
     this.bankDepositService.getClient(clientId).subscribe(
       (data: any) => {
         const client: Client = data.data;
         this.clients[clientId] = client.name;  // Зберігаємо ім'я клієнта у словнику
       },
       error => {
         console.error('Error fetching client name:', error);
       }
     );
   }

  onEdit(bankDeposit: any) {
    this.selectedBankDeposit = { 
      _id: bankDeposit._id,
      client: bankDeposit.client,
      amount: bankDeposit.amount,
      interestRate: bankDeposit.interestRate,
      startDate: bankDeposit.startDate,
      endDate: bankDeposit.endDate
    };
  }

 

  onUpdate(): void {
    if (!this.selectedBankDeposit) {
      console.error('No security selected for update');
      return;
    }
    const bankDeposit = this.selectedBankDeposit;
    this.bankDepositService.updateBankDeposit(bankDeposit).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedBankDeposit = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedBankDeposit = null; 
  }
  onSelectForDeletion(bankDeposit: any) {
    this.selectedBankDepositForDeletion = { 
      _id: bankDeposit._id,
      client: bankDeposit.client,
      amount: bankDeposit.amount,
      interestRate: bankDeposit.interestRate,
      startDate: bankDeposit.startDate,
      endDate: bankDeposit.endDate
    };
  }
  onDelete(): void {
    if (!this.selectedBankDepositForDeletion) {
      console.error('No security selected for delete');
      return;
    }
    const bankDeposit = this.selectedBankDepositForDeletion;
    this.bankDepositService.deleteBankDeposit(bankDeposit._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedBankDepositForDeletion = null; 
        this.ngOnInit();
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete() {
    this.selectedBankDepositForDeletion = null;
  }
}
