import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotationhistory } from '../models/quotationhistory';
import { Client } from 'src/app/models/client';
import { Security } from 'src/app/models/security';
@Injectable({
  providedIn: 'root'
})
export class QuotationHistoryService {

  private apiUrl = environment.apiUrl + "/api/v1/quotation/";
  private apiUrl2 = environment.apiUrl + "/api/v1/security/";


  constructor(private http: HttpClient) {}

  getQuotationhistories(): Observable<Quotationhistory[]> {
    return this.http.get<Quotationhistory[]>(this.apiUrl);
  }

  getQuotationhistory(): Observable<Quotationhistory> {
    return this.http.get<Quotationhistory>(this.apiUrl);
  }
  getSecurity(securityId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl2+`${securityId}`);
  }

  updateQuotationhistory(quotationData: Quotationhistory): Observable<any> {
    return this.http.put(`${this.apiUrl}${quotationData._id}`, quotationData);
  }

  updateSecurity(securityData: Security): Observable<any> {
    return this.http.put(`${this.apiUrl2}${securityData._id}`, securityData);
  }
  updateRatingAndAnnualYield(id: string, updateData: { rating: number, annualYield: number }): Observable<any> {
    return this.http.put(`${this.apiUrl2}${id}`, updateData);
  }
  deleteQuotationhistory(quotationid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${quotationid}`);
  }
}
