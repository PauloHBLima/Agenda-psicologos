import { Component, OnInit } from '@angular/core';
import { AppointmentService, Page } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

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
  selector: 'app-listar-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './listar-agendamentos.component.html',
  styleUrls: ['./listar-agendamentos.component.scss']
})
export class ListarAgendamentosComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns = ['id', 'startTime', 'clientId', 'paid', 'actions'];

  loading = false;
  page = 0;
  size = 10;
  totalElements = 0;

  startDate!: Date | null;
  endDate!: Date | null;

  constructor(
    private service: AppointmentService,
    private router: Router,
    private adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.adapter.setLocale('pt-BR');
    this.loadAppointments();
  }

  private formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  loadAppointments(): void {
    this.loading = true;

    if (this.startDate && this.endDate) {
      const start = this.formatDate(this.startDate);
      const end = this.formatDate(this.endDate);

      this.service.getByDate(start, end, this.page, this.size).subscribe({
        next: (data: Page<Appointment>) => {
          this.appointments = data.content;
          this.totalElements = data.totalElements;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar agendamentos:', err);
          this.loading = false;
        }
      });
    } else {
      this.service.getAllPaginated(this.page, this.size).subscribe({
        next: (data: Page<Appointment>) => {
          this.appointments = data.content;
          this.totalElements = data.totalElements;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar agendamentos:', err);
          this.loading = false;
        }
      });
    }
  }

  applyFilter(): void {
    this.page = 0;
    this.loadAppointments();
  }

  limparFiltro(): void {
    this.startDate = null;
    this.endDate = null;
    this.page = 0;
    this.loadAppointments();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadAppointments();
  }

  novoAgendamento(): void {
    this.router.navigate(['/agendamentos/criar']);
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }

  editar(id: number): void {
    this.router.navigate(['/agendamentos/editar', id]);
  }

  excluir(id: number): void {
    // implementar exclusão
  }
}
