import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-criar-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './criar-agendamento.component.html',
  styleUrls: ['./criar-agendamento.component.scss']
})
export class CriarAgendamentoComponent implements OnInit {
  form!: FormGroup;
  saving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [null, Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]],
      paid: [false]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const { date, startHour, endHour, clientId, paid } = this.form.value;

    const startTime = this.combineDateAndTime(date, startHour);
    const endTime = this.combineDateAndTime(date, endHour);

    const dto = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      clientId,
      paid
    };

    this.service.create(dto).subscribe({
      next: () => {
        this.snack.open('Agendamento criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigateByUrl('/agendamentos');
      },
      error: (err) => {
        console.error('Erro ao criar agendamento:', err);
        this.snack.open('Erro ao criar agendamento.', 'Fechar', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigateByUrl('/agendamentos');
  }

  private combineDateAndTime(date: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    return combined;
  }
}
