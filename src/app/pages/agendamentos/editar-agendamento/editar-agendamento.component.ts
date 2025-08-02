import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppointmentUpdateDTO } from '../../../interfaces/appointmentUpdateDTO';
import { MatIconModule } from '@angular/material/icon';
import { PaymentStatusPipe } from "../../../pipes/custom-pipes";



interface Client {
  id: number;
  name: string;
}

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
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatIconModule,
]
})
export class EditarAgendamentoComponent implements OnInit {

  onClientSelected(event: MatAutocompleteSelectedEvent) {
  const selectedClientId = event.option.value;
  this.form.get('clientId')?.setValue(selectedClientId);
}

  form!: FormGroup;
  id!: number;
  loading = true;
  saving = false;

  clients: Client[] = [];
  filteredClients: Observable<Client[]> = of([]);

  endTimeValue!: Date;
  appointmentStatusValue!: string;
  priceValue!: number | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AppointmentService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  get clientIdControl(): FormControl {
    return this.form.get('clientId') as FormControl;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
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

  loadAgendamento(): void {
    this.service.getById(this.id).subscribe({
      next: (data: Appointment) => {
        const start = new Date(data.startTime);
        if (isNaN(start.getTime())) {
          this.snack.open('Data do agendamento inválida.', 'Fechar', { duration: 3000 });
          this.loading = false;
          return;
        }

        this.endTimeValue = new Date(data.endTime);
        this.appointmentStatusValue = data.appointmentStatus;
        this.priceValue = data.price ?? null;

        this.form.patchValue({
          date: start,
          time: this.formatTime(start),
          paid: data.paid,
          clientId: data.clientId
        });

        this.clientIdControl.setValue(data.clientId);

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

submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.saving = true;

  const formValue = this.form.value;
  const date: Date = new Date(formValue.date);
  const [hours, minutes] = formValue.time.split(':').map((v: string) => parseInt(v, 10));
  date.setHours(hours, minutes);

  const status = formValue.paid ? 'COMPLETED' : 'PENDING';


  const dto: AppointmentUpdateDTO = {
    id: this.id,
    startTime: date.toISOString(),
    endTime: this.endTimeValue.toISOString(),
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
      this.router.navigateByUrl('/');
    },
    error: () => {
      this.saving = false;
      this.snack.open('Erro ao atualizar agendamento.', 'Fechar', { duration: 3000 });
    }
  });
}

  cancelar(): void {
    this.router.navigateByUrl('/');
  }
}
