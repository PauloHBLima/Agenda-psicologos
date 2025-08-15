import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../../../services/client.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  totalElements = 0;
  page = 0;
  size = 10;
  nameFilter = '';
  loading = false;

  constructor(
    private service: ClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.service.getClientsFull(this.page, this.size, this.nameFilter).subscribe({
      next: (res) => {
        this.clients = res.content;
        this.totalElements = res.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao carregar clientes. Tente novamente.');
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.fetchClients();
  }

  onSearch() {
    this.page = 0;
    this.fetchClients();
  }

  clearSearch() {
    this.nameFilter = '';
    this.page = 0;
    this.fetchClients();
  }

  goToCreate() {
    this.router.navigate(['/clientes/novo']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  editClient(id: number) {
    this.router.navigate(['/clientes', id]);
  }

  deleteClient(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Tem certeza que deseja excluir o cliente "${name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.service.deleteClient(id).subscribe({
          next: () => {
            alert(`Cliente "${name}" excluído com sucesso.`);
            this.fetchClients();
          },
          error: () => {
            this.loading = false;
            alert('Erro ao excluir cliente. Tente novamente.');
          }
        });
      }
    });
  }
}
