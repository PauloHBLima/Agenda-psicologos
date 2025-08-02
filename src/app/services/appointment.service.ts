import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment.interface';
import { environment } from '../../environments/environment';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  createAppointment(appointment: Appointment) {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = `${environment.apiBaseUrl}/appointments`; // ajuste se necessário

  constructor(private http: HttpClient) {}

 getAll(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.apiUrl);
}

getAllPaginated(page: number, size: number): Observable<Page<Appointment>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<Page<Appointment>>(this.apiUrl, { params });
}
  getByDate(firstDate: string, lastDate: string, page = 0, size = 10): Observable<Page<Appointment>> {
    const params = new HttpParams()
      .set('firstDate', firstDate)
      .set('lastDate', lastDate)
      .set('page', page)
      .set('size', size);
console.log("firstdate:", firstDate)
console.log("lastdate:", lastDate)
    return this.http.get<Page<Appointment>>(`${this.apiUrl}/findByDate`, { params });
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  create(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  update(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
