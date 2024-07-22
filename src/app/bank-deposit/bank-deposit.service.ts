import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankDeposit } from '../models/bank-deposit';
import { Client } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class BankDepositService {

  private apiUrl = environment.apiUrl + "/api/v1/bankDeposit/";
  private apiUrl1 = environment.apiUrl + "/api/v1/client/";
  private apiUrl2 = environment.apiUrl + "/api/v1/auth/me";


  constructor(private http: HttpClient) {}

  getBankDeposits(): Observable<BankDeposit[]> {
    return this.http.get<BankDeposit[]>(this.apiUrl);
  }

  getBankDeposit(): Observable<BankDeposit> {
    return this.http.get<BankDeposit>(this.apiUrl);
  }

  getClient(clientId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl1+`${clientId}`);
  }

  createBankDeposit(depositData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, depositData);
  }

  updateBankDeposit(bankDepositData: BankDeposit): Observable<any> {
    return this.http.put(`${this.apiUrl}${bankDepositData._id}`, bankDepositData);
  }

  deleteBankDeposit(bankDepositid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${bankDepositid}`);
  }

  getMe(): Observable<any> {
    return this.http.get<Client>(this.apiUrl2);
  }
}
