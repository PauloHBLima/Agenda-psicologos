import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { AppointmentService, Page as PageResponse } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listar-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule
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

  constructor(
    private service: AppointmentService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.service.getAllPaginated(this.page, this.size).subscribe({
      next: (data: PageResponse<Appointment>) => {
        this.appointments = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar agendamentos', err);
        this.snack.open('Erro ao carregar agendamentos', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadAppointments();
  }

  editar(id: number): void {
    this.router.navigate(['/agendamentos/editar', id]);
  }

  excluir(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir este agendamento?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.service.delete(id).subscribe({
          next: () => {
            this.snack.open('Agendamento excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.loadAppointments();
          },
          error: (err: any) => {
            console.error('Erro ao excluir agendamento', err);
            this.snack.open('Erro ao excluir agendamento.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  novoAgendamento(): void {
    this.router.navigate(['/agendamentos/criar']);
  }
}
