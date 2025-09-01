import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface EmergencyContact {
  name: string;
  email?: string;
  phoneNumber?: string;
  relationship: string;
}

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
  emergencyContacts?: EmergencyContact[];
}

export interface ClientMin {
  id: number;
  name: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = '/api/clients';

  constructor(private http: HttpClient) {}

  getClientsFull(
    page: number = 0,
    size: number = 10,
    nameFilter?: string
  ): Observable<Page<Client>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (nameFilter) {
      params = params.set('name', nameFilter);
      return this.http.get<Page<Client>>(`${this.baseUrl}/findByName`, { params }).pipe(
        map(pageData => ({
          ...pageData,
          content: pageData.content.map(this.mapClient)
        }))
      );
    }

    return this.http.get<Page<Client>>(this.baseUrl, { params }).pipe(
      map(pageData => ({
        ...pageData,
        content: pageData.content.map(this.mapClient)
      }))
    );
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`).pipe(
      map(this.mapClient)
    );
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

  private mapClient(client: Client): Client {
    return {
      ...client,
      emergencyContacts: client.emergencyContacts ?? [],
      appointmentPrice: client.appointmentPrice ?? 0,
      appointmentFrequency: client.appointmentFrequency ?? 1,
      appointmentDurationInMinutes: client.appointmentDurationInMinutes ?? 50
    };
  }
}
