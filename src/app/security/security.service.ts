import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Security } from '../models/security';
import { CreateSecurity } from '../models/create-security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl = environment.apiUrl + "/api/v1/securities";
  private apiUrl1 = environment.apiUrl + "/api/v1/security/";
  private apiUrl2 = environment.apiUrl + "/api/v1/security";
  private apiUrl3 = environment.apiUrl + "/api/v1/auth/me";


  constructor(private http: HttpClient) {}

  getSecurities(): Observable<Security[]> {
    return this.http.get<Security[]>(this.apiUrl);
  }

  getSecurity(): Observable<Security> {
    return this.http.get<Security>(this.apiUrl1);
  }

  createSecurity(securityData: CreateSecurity): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, securityData);
  }

  updateSecurity(securityData: Security): Observable<any> {
    return this.http.put(`${this.apiUrl1}${securityData._id}`, securityData);
  }

  deleteSecurity(securityid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl1}${securityid}`);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}
