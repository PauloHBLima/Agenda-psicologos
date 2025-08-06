import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Client {
  id?: number;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  appointmentPrice: number;
  appointmentFrequency: number;
  treatmentStartDate: string;
  treatmentEndDate: string;
  appointmentDurationInMinutes: number;
}

export interface ClientMin {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = '/api/clients';

  constructor(private http: HttpClient) {}

  getClients(page: number = 0, size: number = 10, nameFilter?: string) {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (nameFilter) {
      params = params.set('name', nameFilter);
      return this.http.get<any>(`${this.baseUrl}/findByName`, { params });
    }

    return this.http.get<any>(this.baseUrl, { params });
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalClients(): Observable<number> {
    return this.http.get<{ total: number }>(`${this.baseUrl}/total`).pipe(
      map(response => response.total)
    );

  }
}
