import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl + "/api/v1/users/";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUser(): Observable<Users> {
    return this.http.get<Users>(this.apiUrl);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }

  updateUser(userData: Users): Observable<any> {
    return this.http.put(`${this.apiUrl}${userData._id}`, userData);
  }

  deleteUser(userid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${userid}`);
  }
}
