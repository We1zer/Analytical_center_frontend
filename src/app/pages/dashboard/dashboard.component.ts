import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: any[]=[];
  constructor(private http: HttpClient){
    this.loadUsers();
  }
  loadUsers(){
    this.http.get('http://localhost:5000/api/v1/users').subscribe((res:any)=>{
        this.users = res.data;
    })
  }
}
