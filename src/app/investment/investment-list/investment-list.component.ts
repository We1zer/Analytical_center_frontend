import { Component } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { Investment } from 'src/app/models/investment';
import { Client } from 'src/app/models/client';
import { Security } from 'src/app/models/security';
@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.css']
})
export class InvestmentListComponent {

  investments: Investment[] = [];
  client: Client | null = null;
  selectedInvestment: Investment | null = null;
  selectedInvestmentForDeletion: Investment | null = null;
  clientName: string | null = null;
  clients: { [key: string]: string } = {};
  clientss: { [key: string]: string } = {};
  clientNames: string[] = []; 
  securities: { [key: string]: string } = {};
  securitiess: { [key: string]: string } = {};
  securitiesCodes: string[] = [];
  newInvestment: any = {
    security:  "",
    client:  "",
    purchasePrice: 0,
    purchaseDate: "",
    saleDate: "",
    salePrice: 0
   };
   isAddModalOpen = false;
  role: string | undefined;

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
      this.investmentService.getInvestments().subscribe((data: any) => {
        this.investments = data.data;

        this.investmentService.getMe().subscribe((data: any) => {
          this.role = data.data.role;
          console.log(this.role);
        });
        
        this.investments.forEach(investment => {
          this.getClientName(investment.client);  
        });

        this.investments.forEach(investment => {
          this.getSecurityCode(investment.security);  
        });

        console.log('Loaded investments:', this.investments);
      });
    }

   getClientName(clientId: string): void {
     this.investmentService.getClient(clientId).subscribe(
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
   getSecurityCode(securityId: string): void {
    this.investmentService.getSecurity(securityId).subscribe(
      (data: any) => {
        const security: Security = data.data;
        this.securities[securityId] = security.securityCode;  
        this.securitiess[security.securityCode] = security._id;  
         this.securitiesCodes = Object.values(this.securities);
      },
      error => {
        console.error('Error fetching security code:', error);
      }
    );
  }

  onEdit(investment: any) {
    this.selectedInvestment = { 
      _id: investment._id,
      security: investment.security,
      client: investment.client,
      purchasePrice: investment.purchasePrice,
      purchaseDate: investment.purchaseDate,
      saleDate: investment.saleDate,
      salePrice: investment.salePrice

    };
  }

 onAdd(): void {
    this.isAddModalOpen = true;
    this.newInvestment = {
      security:  "",
    client:  "",
    purchasePrice: 0,
    purchaseDate: "",
    saleDate: "",
    salePrice: 0
    };
  }

  onAddNew(): void {
    this.investmentService.createInvestment(this.newInvestment).subscribe(
      response => {
        console.log('Add successful:', response);
        this.isAddModalOpen = false;
        this.ngOnInit();
      },
      error => {
        console.error('Add failed:', error);
      }
    );
  }

  onCancelAdd(): void {
    this.isAddModalOpen = false;
  }

  onUpdate(): void {
    if (!this.selectedInvestment) {
      console.error('No investment selected for update');
      return;
    }
    const bankDeposit = this.selectedInvestment;
    this.investmentService.updateInvestment(bankDeposit).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedInvestment = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedInvestment = null; 
  }
  onSelectForDeletion(investment: any) {
    this.selectedInvestmentForDeletion = { 
      _id: investment._id,
      security: investment.security,
      client: investment.client,
      purchasePrice: investment.purchasePrice,
      purchaseDate: investment.purchaseDate,
      saleDate: investment.saleDate,
      salePrice: investment.salePrice

    };
  }
  onDelete(): void {
    if (!this.selectedInvestmentForDeletion) {
      console.error('No investment selected for delete');
      return;
    }
    const investment = this.selectedInvestmentForDeletion;
    this.investmentService.deleteInvestment(investment._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedInvestmentForDeletion = null; 
        this.ngOnInit();
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete() {
    this.selectedInvestmentForDeletion = null;
  }
}
