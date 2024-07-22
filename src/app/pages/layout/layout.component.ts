import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})



export class LayoutComponent {
  role: string | undefined;

  private apiUrl1 = environment.apiUrl + "/api/v1/auth/me";
  cdr: any;
  


  constructor(private http: HttpClient, private router: Router){ }

  ngOnInit(): void {
    this.getMe().subscribe((data: any) => {
      this.role = data.data.role;
      console.log(this.role);
    });
  }

  onLogout(){
    this.http.get('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/logout').subscribe((res:any)=>{
      if(res.success) {
        alert('Logout Success');
        localStorage.removeItem('loginToken');
        this.router.navigateByUrl('/');
        this.role = undefined; 
       // this.authService.emitAuthStatusChange(false);
        this.cdr.detectChanges(); 
      }else{
        alert(res.error);
      }
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loginToken');
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }
}
