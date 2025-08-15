import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppointmentService } from '../../../services/appointment.service';
import moment from 'moment';

// Formato de data DD/MM/YYYY
export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-criar-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './criar-agendamento.component.html',
  styleUrls: ['./criar-agendamento.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
  ]
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
    const combined = moment(date).hours(hours).minutes(minutes).seconds(0).toDate();
    return combined;
  }
}
