import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Security } from '../models/security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl = environment.apiUrl + "/api/v1/securities";
  private apiUrl1 = environment.apiUrl + "/api/v1/security/";

  constructor(private http: HttpClient) {}

  getSecurities(): Observable<Security[]> {
    return this.http.get<Security[]>(this.apiUrl);
  }

  getSecurity(): Observable<Security> {
    return this.http.get<Security>(this.apiUrl1);
  }

  updateSecurity(securityData: Security): Observable<any> {
    return this.http.put(`${this.apiUrl1}${securityData._id}`, securityData);
  }

  deleteSecurity(securityid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl1}${securityid}`);
  }
}
