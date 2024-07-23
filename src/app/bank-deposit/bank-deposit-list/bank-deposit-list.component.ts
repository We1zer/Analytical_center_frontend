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
  clientss: { [key: string]: string } = {};
  clientDictionary: { [key: string]: string } = {}; 
  clientNames: string[] = []; 
  newBankDeposit: any = {
    client: "",
    amount: 0,
    interestRate: 0,
    startDate: "",
    endDate: ""
   };
   isAddModalOpen = false;
  role: string | undefined;

  constructor(private bankDepositService: BankDepositService) {}
  ngOnInit(): void {
      this.bankDepositService.getBankDeposits().subscribe((data: any) => {
        this.bankDeposits = data.data;

       
        this.bankDeposits.forEach(deposit => {
          this.getClientName(deposit.client);  
        });
        this.bankDepositService.getMe().subscribe((data: any) => {
          this.role = data.data.role;
          console.log(this.role);
        });
        console.log('Loaded bank deposits:', this.bankDeposits);
      });
    }

   getClientName(clientId: string): void {
     this.bankDepositService.getClient(clientId).subscribe(
       (data: any) => {
         const client: Client = data.data;
         this.clients[clientId] = client.name;  
         this.clientss[client.name] = client._id;  
         this.clientNames = Object.values(this.clients); 
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
  onAdd(): void {
    this.isAddModalOpen = true;
    this.newBankDeposit = {
      client: "",
    amount: 0,
    interestRate: 0,
    startDate: "",
    endDate: ""
    };
  }

  onAddNew(): void {
    this.bankDepositService.createBankDeposit(this.newBankDeposit).subscribe(
      response => {
        console.log('Add successful:', response);
        this.isAddModalOpen = false;
        this.ngOnInit();
      },
      error => {
        console.error('Add failed:', error);
        console.log(this.newBankDeposit);
        
        
      }
    );
  }
 
 onCancelAdd(): void {
    this.isAddModalOpen = false;
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
