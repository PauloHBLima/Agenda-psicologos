import { Component, OnInit } from '@angular/core';
import { ClientMin, ClientService } from '../../../services/client.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatCard } from "@angular/material/card";

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
    MatProgressBarModule,
    MatListModule,
    MatCard
],
})
export class ClientListComponent implements OnInit {
  clients: ClientMin[] = [];
  totalElements = 0;
  page = 0;
  size = 10;
  nameFilter = '';
  loading = false;

  constructor(private service: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.service.getClients(this.page, this.size, this.nameFilter).subscribe({
      next: (res) => {
        this.clients = res.content;
        this.totalElements = res.totalElements;
        this.loading = false;
      },
      error: () => (this.loading = false),
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

  goToCreate() {
    this.router.navigate(['/clientes/novo']);
  }

  editClient(id: number) {
    this.router.navigate(['/clientes', id]);
  }
}
