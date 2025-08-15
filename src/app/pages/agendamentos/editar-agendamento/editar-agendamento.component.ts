import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppointmentUpdateDTO } from '../../../interfaces/appointmentUpdateDTO';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

interface Client {
  id: number;
  name: string;
}

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

@Component({
  standalone: true,
  selector: 'app-editar-agendamento',
  templateUrl: './editar-agendamento.component.html',
  styleUrls: ['./editar-agendamento.component.scss'],
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EditarAgendamentoComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  loading = true;
  saving = false;

  clients: Client[] = [];
  filteredClients: Observable<Client[]> = of([]);

  priceValue!: number | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AppointmentService,
    private router: Router,
    private snack: MatSnackBar,
    private adapter: DateAdapter<any>
  ) {}

  get clientIdControl(): FormControl {
    return this.form.get('clientId') as FormControl;
  }

  ngOnInit(): void {
    this.adapter.setLocale('pt-BR');

    this.form = this.fb.group({
      date: [null, Validators.required],
      startHour: [null, Validators.required],
      endHour: [null, Validators.required],
      paid: [false, Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]]
    });

    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.id = +paramId;
        this.loadAgendamento();
      } else {
        this.snack.open('ID inválido!', 'Fechar', { duration: 3000 });
        this.router.navigateByUrl('/');
      }
    });

    this.loadClients();

    this.filteredClients = this.clientIdControl.valueChanges.pipe(
      startWith(this.clientIdControl.value),
      map(value => {
        const name = typeof value === 'string' ? value : this.displayClientName(value);
        return name ? this._filterClients(name) : this.clients.slice();
      })
    );
  }

  private formatDateRange(date: Date, hour: string): Date {
    const [h, m] = hour.split(':').map(Number);
    const dt = moment(date).hours(h).minutes(m).seconds(0).toDate();
    return dt;
  }

  loadAgendamento(): void {
    this.service.getById(this.id).subscribe({
      next: (data: Appointment) => {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);

        this.priceValue = data.price ?? null;

        this.form.patchValue({
          date: start,
          startHour: this.formatTime(start),
          endHour: this.formatTime(end),
          paid: data.paid,
          clientId: data.clientId
        });

        this.loading = false;
      },
      error: () => {
        this.snack.open('Erro ao carregar agendamento', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  loadClients(): void {
    this.clients = [
      { id: 1, name: 'João Silva' },
      { id: 2, name: 'Maria Oliveira' },
      { id: 3, name: 'Carlos Souza' }
    ];
  }

  private _filterClients(name: string): Client[] {
    const filterValue = name.toLowerCase();
    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
  }

  displayClientName(id: number | null): string {
    if (typeof id !== 'number') return '';
    const client = this.clients.find(c => c.id === id);
    return client ? client.name : '';
  }

  formatTime(date: Date): string {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  onClientSelected(event: MatAutocompleteSelectedEvent) {
    this.form.get('clientId')?.setValue(event.option.value);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const formValue = this.form.value;

    const startDate = this.formatDateRange(formValue.date, formValue.startHour);
    const endDate = this.formatDateRange(formValue.date, formValue.endHour);

    const status = formValue.paid ? 'COMPLETED' : 'PENDING';

    const dto: AppointmentUpdateDTO = {
      id: this.id,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      appointmentStatus: status,
      price: this.priceValue,
      paid: formValue.paid,
      clientId: formValue.clientId
    };

    console.log('DTO enviado:', dto);

    this.service.update(this.id, dto).subscribe({
      next: () => {
        this.saving = false;
        this.snack.open('Agendamento atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigateByUrl('/agendamentos');
      },
      error: () => {
        this.saving = false;
        this.snack.open('Erro ao atualizar agendamento.', 'Fechar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigateByUrl('/agendamentos');
  }
}
