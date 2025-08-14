import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Appointment } from '../interfaces/appointment.interface';
import { environment } from '../../environments/environment';
import { AppointmentUpdateDTO } from '../interfaces/appointmentUpdateDTO';

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
  private readonly apiUrl = `${environment.apiBaseUrl}/appointments`; // ajuste se necessário

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0).toISOString();
  const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

  const params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate);

  return this.http.get<Appointment[]>(this.apiUrl, { params });
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
      .set('page', page.toString())
      .set('size', size.toString());

    console.log("firstDate:", firstDate);
    console.log("lastDate:", lastDate);

    return this.http.get<Page<Appointment>>(`${this.apiUrl}/findByDate`, { params });
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  create(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  update(id: number, dto: AppointmentUpdateDTO): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getTotalAppointments(): Observable<number> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total`).pipe(
      map(response => response.total)
    );

    
  }
}
