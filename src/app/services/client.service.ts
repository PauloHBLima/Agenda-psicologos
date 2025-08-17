import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// Tipo para contatos de emergência
export interface EmergencyContact {
  name: string;
  email?: string;
  phoneNumber?: string;
  relationship: string;
}

// Tipo completo de cliente
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

// Tipo resumido para listagens
export interface ClientMin {
  id: number;
  name: string;
}

// Tipo de paginação
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

  // Listagem completa com paginação e filtro
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

  // Buscar cliente por ID
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`).pipe(
      map(this.mapClient)
    );
  }

  // Criar novo cliente
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  // Atualizar cliente existente
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
  }

  // Deletar cliente
  deleteClient(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Total de clientes
  getTotalClients(): Observable<number> {
    return this.http.get<{ total: number }>(`${this.baseUrl}/total`).pipe(
      map(response => response.total)
    );
  }

  // Mapeia campos para garantir tipos corretos
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
