import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: Users[] = [];
  selectedUser: Users | null = null;
  selectedUserForDeletion: Users | null = null;
  newUser: any = {
    name: "",
    email: "",
    password: "",
    role: ""
    
   };
   isAddModalOpen = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data.data;
      console.log('Loaded user:', this.users);
    });
  }

  onEdit(user: any) {
    this.selectedUser = { 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  onUpdate(): void {
    if (!this.selectedUser) {
      console.error('No user selected for update');
      return;
    }
    const user = this.selectedUser;
    this.usersService.updateUser(user).subscribe(
      response => {
        console.log('Update successful:', response);
        this.selectedUser = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  onAdd(): void {
    this.isAddModalOpen = true;
    this.newUser = {
     name: "",
    email: "",
    password: "",
    role: ""
    };
  }

  onAddNew(): void {
    this.usersService.createUser(this.newUser).subscribe(
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

  onCancelEdit(): void {
    this.selectedUser = null; 
  }
  onSelectForDeletion(user: any) {
    this.selectedUserForDeletion = { 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
  onDelete(): void {
    if (!this.selectedUserForDeletion) {
      console.error('No security selected for delete');
      return;
    }
    const user = this.selectedUserForDeletion;
    this.usersService.deleteUser(user._id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.selectedUserForDeletion = null; 
        this.ngOnInit(); 
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  onCancelDelete() {
    this.selectedUserForDeletion = null; 
  }
}
