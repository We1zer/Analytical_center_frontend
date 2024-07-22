import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})



export class LayoutComponent {
  constructor(private http: HttpClient, private router: Router){ }
  onLogout(){
    this.http.get('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/logout').subscribe((res:any)=>{
      if(res.success) {
        alert('Logout Success');
        localStorage.removeItem('loginToken');
        this.router.navigateByUrl('/dashboard');
      }else{
        alert(res.error);
      }
    })
  }
}
