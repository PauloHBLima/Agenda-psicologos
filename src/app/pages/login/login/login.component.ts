import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, LoginRequest } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos';
      return;
    }

    this.loading = true;
    const dto: LoginRequest = { email: this.email, password: this.password };

    this.loginService.login(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'E-mail ou senha inválidos';
        console.error(err);
      }
    });
  }
}
