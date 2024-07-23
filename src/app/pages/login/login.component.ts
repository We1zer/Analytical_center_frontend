import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  role: string | undefined;

  private apiUrl1 = environment.apiUrl + "/api/v1/auth/me";
  cdr: any;

  loginObj: any = {
   
    "email": "",
    "password": ""
  };

  registerObj: any = {
    "name": "",
    "email": "",
    "password": ""
  };

  forgotPasswordObj: any = {
    "email": ""
  };

  constructor(private http: HttpClient, private router: Router,private authService: AuthService){ }

  onLogin(){
    this.http.post('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/login', this.loginObj).subscribe((res:any)=>{
      if(res.success) {
        alert('login Success');
        localStorage.setItem('loginToken', res.token);
        this.authService.emitAuthStatusChange(true);
        this.router.navigateByUrl('/dashboard');
      }else{
        alert(res.error);
      }
    })
  }

  onRegister(){
    this.http.post('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/register', this.registerObj).subscribe((res:any)=>{
      if(res.success) {
        alert('Register Success');
        localStorage.setItem('loginToken', res.token);
        this.authService.emitAuthStatusChange(true);
        this.router.navigateByUrl('/dashboard');
      }else{
        alert(res.error);
      }
    })
  }

  onForgotPassword(email: string){
    this.forgotPasswordObj.email=email;
    this.http.post('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/forgotpassword', this.forgotPasswordObj).subscribe((res:any)=>{
      if(res.success) {
        alert(`Forgot Password Success ${res.data}`);
        this.router.navigateByUrl('/dashboard');
      }else{
        alert(res.error);
      }
    })
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }
}
