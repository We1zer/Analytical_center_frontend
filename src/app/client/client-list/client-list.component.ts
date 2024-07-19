import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  selectedClientForDeletion: Client | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data.data;
      console.log('Loaded securities:', this.clients);
    });
  }

  onEdit(client: any) {
    this.selectedClient = { 
      _id: client._id,
      name: client.name,
      ownershipType: client.ownershipType,
      address: client.address,
      phone: client.phone
    };
  }

  onUpdate(): void {
    if (!this.selectedClient) {
      console.error('No security selected for update');
      return;
    }
    const client = this.selectedClient;
    this.clientService.updateClient(client).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedClient = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onCancelEdit(): void {
    this.selectedClient = null; 
  }
  onSelectForDeletion(client: any) {
    this.selectedClientForDeletion = { 
      _id: client._id,
      name: client.name,
      ownershipType: client.ownershipType,
      address: client.address,
      phone: client.phone
    };
  }
  onDelete(): void {
    if (!this.selectedClientForDeletion) {
      console.error('No security selected for delete');
      return;
    }
    const client = this.selectedClientForDeletion;
    this.clientService.deleteClient(client._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedClientForDeletion = null; 
        this.ngOnInit();
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete() {
    this.selectedClientForDeletion = null;
  }
}
