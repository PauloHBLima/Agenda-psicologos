import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    MatAutocompleteModule
  ]
})
export class EditarAgendamentoComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  loading = true;
  saving = false;

  clients: Client[] = [];
  filteredClients: Observable<Client[]> = of([]);

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

    this.form = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      paid: [false, Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]]
    });

    this.loadClients();

    this.filteredClients = this.clientIdControl.valueChanges.pipe(
    startWith(this.clientIdControl.value), 
    map(value => typeof value === 'string' ? value : this.displayClientName(value)), 
    map(name => name ? this._filterClients(name) : this.clients.slice())
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

    const date: Date = this.form.value.date;
    const time: string = this.form.value.time;
    const [hours, minutes] = time.split(':').map((v: string) => parseInt(v, 10));
    date.setHours(hours, minutes);

    const dto: Partial<Appointment> = {
      startTime: date.toISOString(),
      paid: this.form.value.paid,
      clientId: this.form.value.clientId
    };

    this.service.update(this.id, dto as Appointment).subscribe({
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
