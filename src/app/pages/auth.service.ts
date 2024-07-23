import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  
  authStatus$ = this.authStatus.asObservable();

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('loginToken');
  }

  emitAuthStatusChange(isAuthenticated: boolean): void {
    this.authStatus.next(isAuthenticated);
  }
}
