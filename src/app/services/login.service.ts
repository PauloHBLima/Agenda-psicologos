import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = `${environment.apiBaseUrl}/users/login`;
  private readonly storageKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Faz login e armazena o token
  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, dto).pipe(
      tap(response => {
        localStorage.setItem(this.storageKey, response.token);
      })
    );
  }

  // Remove token do localStorage
  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

 isLoggedIn(): boolean {
  const token = localStorage.getItem('authToken'); // tem que ser igual ao setItem
  return !!token;
}

  // Retorna token armazenado (ou null)
  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  // Verifica se o usuário está logado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
