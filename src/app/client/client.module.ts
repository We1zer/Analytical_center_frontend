import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ClientModule { }
