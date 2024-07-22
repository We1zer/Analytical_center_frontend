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

  constructor(private quotationService: QuotationHistoryService) {}

  ngOnInit(): void {
    this.quotationService.getQuotationhistories().subscribe((data: any) => {
      this.quotations = data.data;

      // Отримати деталі безпеки для кожної запису
      const securityPromises = this.quotations.map(quotation => 
        this.getSecurityCode(quotation.security)
      );
      
      Promise.all(securityPromises).then(() => {
        // Групування та сортування даних
        this.sortAndGroupQuotations();
        console.log('Loaded quotations:', this.sortedQuotations);
      });
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

  sortAndGroupQuotations(): void {
    // Групування даних по security
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

    // Сортування всередині кожної групи по даті
    this.sortedQuotations = Object.values(groupedBySecurity).flat()
      .sort((a, b) => {
        // Сортування по security
        if (a.security !== b.security) {
          return a.security.localeCompare(b.security);
        }
        // Сортування по даті у зростаючому порядку
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