import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Security } from 'src/app/models/security';


@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css']
})
export class SecurityListComponent implements OnInit {

  securities: Security[] = [];
  selectedSecurity: Security | null = null;
  selectedSecurityForDeletion: Security | null = null;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.securityService.getSecurities().subscribe((data: any) => {
      this.securities = data.data;
      console.log('Loaded securities:', this.securities);
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
        this.ngOnInit(); // Reload securities after update
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedSecurity = null; // Clear selected security
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
        this.ngOnInit(); // Reload securities after update
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
