import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../models/investment';
import { Client } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = environment.apiUrl + "/api/v1/investment/";
  private apiUrl1 = environment.apiUrl + "/api/v1/client/";
  private apiUrl2 = environment.apiUrl + "/api/v1/security/";

  constructor(private http: HttpClient) {}

  getInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.apiUrl);
  }

  getInvestment(): Observable<Investment> {
    return this.http.get<Investment>(this.apiUrl);
  }

  getClient(clientId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl1+`${clientId}`);
  }

  getSecurity(securityId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl2+`${securityId}`);
  }

  createInvestment(investmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, investmentData);
  }

  updateInvestment(investmentData: Investment): Observable<any> {
    return this.http.put(`${this.apiUrl}${investmentData._id}`, investmentData);
  }

  deleteInvestment(investmentid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${investmentid}`);
  }
}
