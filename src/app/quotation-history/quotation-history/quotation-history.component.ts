import { Component, OnInit } from '@angular/core';
import { QuotationHistoryService } from '../quotation-history.service';
import { Quotationhistory } from 'src/app/models/quotationhistory';
import { Security } from 'src/app/models/security';

@Component({
  selector: 'app-quotation-history',
  templateUrl: './quotation-history.component.html',
  styleUrls: ['./quotation-history.component.css']
})
export class QuotationHistoryComponent implements OnInit {
  quotations: Quotationhistory[] = [];
  selectedQuotation: Quotationhistory | null = null;
  selectedQuotationForDeletion: Quotationhistory | null = null;
  securities: { [key: string]: string } = {};
  sortedQuotations: Quotationhistory[] = [];
  updatedSecurities: { [key: string]: { rating: number, annualYield: number } } = {};
  newQuotation: any = {
    security: "",
    date: "",
    price:  0
    
   };
   isAddModalOpen = false;

  constructor(private quotationService: QuotationHistoryService) {}

  ngOnInit(): void {
    this.quotationService.getQuotationhistories().subscribe((data: any) => {
      this.quotations = data.data;

      const securityPromises = this.quotations.map(quotation => 
        this.getSecurityCode(quotation.security)
      );
      
      Promise.all(securityPromises).then(() => {
        this.sortAndGroupQuotations();
        console.log('Loaded quotations:', this.sortedQuotations);
      });
      this.calculateRatingAndAnnualYield();
      this.updateSecurities();
    });
  }

  getSecurityCode(securityId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.quotationService.getSecurity(securityId).subscribe(
        (data: any) => {
          const security: Security = data.data;
          this.securities[securityId] = security.securityCode;  // Зберігаємо код безпеки у словнику
          resolve();
        },
        error => {
          console.error('Error fetching security code:', error);
          reject(error);
        }
      );
    });
  }

  calculateRatingAndAnnualYield(): void {
    this.quotations.forEach(quotation => {
      const securityId = quotation.security;
      const price = quotation.price;

      const rating = price % 10; 
      const annualYield = price % 5; 

      this.updatedSecurities[securityId] = {
        rating,
        annualYield
      };
    });
  }

  updateSecurities(): void {
    const updatePromises = Object.keys(this.updatedSecurities).map(securityId => {
      const updateData = this.updatedSecurities[securityId];
      return this.quotationService.updateRatingAndAnnualYield(securityId, updateData).toPromise();
    });

    Promise.all(updatePromises)
      .then(results => {
        console.log('All securities updated successfully', results);
      })
      .catch(error => {
        console.error('Error updating securities', error);
      });
  }
  onAdd(): void {
    this.isAddModalOpen = true;
    this.newQuotation = {
      security: "",
      date: "",
      price:  0
    };
  }

  onAddNew(): void {
    this.quotationService.createQuotationHistory(this.newQuotation).subscribe(
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

  sortAndGroupQuotations(): void {
    const groupedBySecurity = this.quotations.reduce((acc, quotation) => {
      if (!acc[quotation.security]) {
        acc[quotation.security] = [];
      }
      acc[quotation.security].push({
        ...quotation,
        securityCode: this.securities[quotation.security] || 'Unknown'
      });
      return acc;
    }, {} as { [key: string]: Quotationhistory[] });

    this.sortedQuotations = Object.values(groupedBySecurity).flat()
      .sort((a, b) => {
        if (a.security !== b.security) {
          return a.security.localeCompare(b.security);
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }

  onEdit(quotation: Quotationhistory) {
    this.selectedQuotation = { 
      _id: quotation._id,
      security: quotation.security,
      date: quotation.date,
      price: quotation.price,
    };
  }

  onUpdate(): void {
    if (!this.selectedQuotation) {
      console.error('No quotation selected for update');
      return;
    }
    const user = this.selectedQuotation;
    this.quotationService.updateQuotationhistory(user).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedQuotation = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedQuotation = null; 
  }
  
  onSelectForDeletion(quotation: Quotationhistory) {
    this.selectedQuotationForDeletion = { 
      _id: quotation._id,
      security: quotation.security,
      date: quotation.date,
      price: quotation.price,
    };
  }

  onDelete(): void {
    if (!this.selectedQuotationForDeletion) {
      console.error('No security selected for delete');
      return;
    }
    const user = this.selectedQuotationForDeletion;
    this.quotationService.deleteQuotationhistory(user._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedQuotationForDeletion = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete(): void {
    this.selectedQuotationForDeletion = null; 
  }
}