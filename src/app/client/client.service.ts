import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl + "/api/v1/client/";

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClient(): Observable<Client> {
    return this.http.get<Client>(this.apiUrl);
  }

  updateClient(clientData: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}${clientData._id}`, clientData);
  }

  deleteClient(clientid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${clientid}`);
  }
}
