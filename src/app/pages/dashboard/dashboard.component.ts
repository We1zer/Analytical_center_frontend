import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Security } from 'src/app/models/security';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  securities: Security[] = [];
  
  constructor(private http: HttpClient){
    this.getRecommendation();
  }
  getRecommendation(){
    this.http.get('http://localhost:5000/api/v1/recommendation').subscribe((res:any)=>{
        this.securities = res.data;
        console.log('Loaded Recomended securities:', this.securities);
    })
  }
}
