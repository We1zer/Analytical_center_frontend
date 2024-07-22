import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
  constructor(private http: HttpClient, private router: Router){ }

  onLogin(){
    this.http.post('https://analytical-center-backend-we1zer.onrender.com/api/v1/auth/login', this.loginObj).subscribe((res:any)=>{
      if(res.success) {
        alert('login Success');
        localStorage.setItem('loginToken', res.token);
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
 

}
