import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityListComponent } from './security-list/security-list.component';
import { FormsModule } from '@angular/forms'; 
 



@NgModule({
  declarations: [
    SecurityListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
  ]
})
export class SecurityModule { }
