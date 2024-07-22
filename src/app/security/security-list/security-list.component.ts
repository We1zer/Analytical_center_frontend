import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Security } from 'src/app/models/security';
import { Chart, registerables } from 'chart.js';
import { CreateSecurity } from 'src/app/models/create-security';

Chart.register(...registerables);

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css']
})
export class SecurityListComponent implements OnInit {
  securities: Security[] = [];
  selectedSecurity: Security | null = null;
  selectedSecurityForDeletion: Security | null = null;
  newSecurity: CreateSecurity = {
    securityCode: '',
    minTransactionAmount: 0,
    rating: 0,
    annualYield: 0,
    additionalInfo: ''
  };
  isAddModalOpen = false;
  role: string | undefined;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.loadSecurities();
  }

  loadSecurities(): void {
    this.securityService.getSecurities().subscribe((data: any) => {
      this.securities = data.data;
      console.log('Loaded securities:', this.securities);
    });
    this.securityService.getMe().subscribe((data: any) => {
      this.role = data.data.role;
      console.log(this.role);
    });
  }

  onEdit(security: any) {
    this.selectedSecurity = {
      _id: security._id,
      securityCode: security.securityCode,
      minTransactionAmount: security.minTransactionAmount,
      rating: security.rating,
      annualYield: security.annualYield,
      additionalInfo: security.additionalInfo
    };
  }

  onAdd(): void {
    this.isAddModalOpen = true;
    this.newSecurity = {
      securityCode: '',
      minTransactionAmount: 0,
      rating: 0,
      annualYield: 0,
      additionalInfo: ''
    };
  }

  onAddNew(): void {
    this.securityService.createSecurity(this.newSecurity).subscribe(
      response => {
        console.log('Add successful:', response);
        this.isAddModalOpen = false;
        this.loadSecurities();
      },
      error => {
        console.error('Add failed:', error);
      }
    );
  }

  onUpdate(): void {
    if (!this.selectedSecurity) {
      console.error('No security selected for update');
      return;
    }
    const security = this.selectedSecurity;
    this.securityService.updateSecurity(security).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedSecurity = null; // Clear selected security after update
        this.loadSecurities(); // Reload securities after update
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedSecurity = null; // Clear selected security
  }

  onCancelAdd(): void {
    this.isAddModalOpen = false;
  }

  onSelectForDeletion(security: any) {
    this.selectedSecurityForDeletion = {
      _id: security._id,
      securityCode: security.securityCode,
      minTransactionAmount: security.minTransactionAmount,
      rating: security.rating,
      annualYield: security.annualYield,
      additionalInfo: security.additionalInfo
    };
  }

  onDelete(): void {
    if (!this.selectedSecurityForDeletion) {
      console.error('No security selected for delete');
      return;
    }
    const security = this.selectedSecurityForDeletion;
    this.securityService.deleteSecurity(security._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedSecurityForDeletion = null; // Clear selected security after update
        this.loadSecurities(); // Reload securities after update
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete() {
    this.selectedSecurityForDeletion = null; // Clear selected security for deletion
  }
}
