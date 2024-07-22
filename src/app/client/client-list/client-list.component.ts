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
  newClient: any = {
   name:"",
    ownershipType: "",
    address:  "",
    phone: ""
  };
  isAddModalOpen = false;
  role: string | undefined;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data.data;
      console.log('Loaded securities:', this.clients);
      this.clientService.getMe().subscribe((data: any) => {
        this.role = data.data.role;
        console.log(this.role);
      });
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
  onAdd(): void {
    this.isAddModalOpen = true;
    this.newClient = {
      name:"",
      ownershipType: "",
      address:  "",
      phone: ""
    };
  }

  onAddNew(): void {
    this.clientService.createClient(this.newClient).subscribe(
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

  onCancelAdd(): void {
    this.isAddModalOpen = false;
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
