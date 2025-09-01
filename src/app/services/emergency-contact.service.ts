import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmergencyContact {
  id?: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  relationship: string;
  clientId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

  private baseUrl = 'http://localhost:8080/emergency-contacts';

  constructor(private http: HttpClient) { }

  getByClientId(clientId: number): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(`${this.baseUrl}/client/${clientId}`);
  }

  create(contact: EmergencyContact): Observable<EmergencyContact> {
    return this.http.post<EmergencyContact>(this.baseUrl, contact);
  }

  update(id: number, contact: EmergencyContact): Observable<EmergencyContact> {
    return this.http.put<EmergencyContact>(`${this.baseUrl}/${id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
