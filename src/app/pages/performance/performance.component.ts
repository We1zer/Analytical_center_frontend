import { Component } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Perfomance } from 'src/app/models/performance';
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerfomanceComponent {
  performances: Perfomance[] = [];
  
  constructor(private http: HttpClient){
    this.getRecommendation();
  }
  getRecommendation(){
    this.http.get('https://analytical-center-backend-we1zer.onrender.com/api/v1/recommendation/performance').subscribe((res:any)=>{
        this.performances = res.data;
        console.log('Loaded investment perfomance:', this.performances);
    })
  }
}
