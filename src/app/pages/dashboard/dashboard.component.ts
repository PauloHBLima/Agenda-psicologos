import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService, Page, Client } from '../../services/client.service';
import { AppointmentService, Page as AppointmentPage } from '../../services/appointment.service';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AppointmentMin } from '../../interfaces/appointment-min.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalClients: number | null = null;
  totalAppointments: number | null = null;
  loadingClients = false;
  loadingAppointments = false;

  public clientsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Clientes cadastrados',
        backgroundColor: '#1e3a8a',
        data: []
      }
    ]
  };
  public clientsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  public appointmentsChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Agendamentos',
        borderColor: '#047857',
        backgroundColor: '#047857',
        fill: false,
        data: []
      }
    ]
  };
  public appointmentsChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  constructor(
    private clientService: ClientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.fetchTotals();
    this.loadChartsData();
  }

  fetchTotals(): void {
    this.loadingClients = true;
    this.loadingAppointments = true;

    // Usando o método correto getClientsFull e tipando corretamente
    this.clientService.getClientsFull(0, 1).subscribe({
      next: (res: Page<Client>) => {
        this.totalClients = res.totalElements || 0;
        this.loadingClients = false;
      },
      error: () => {
        this.totalClients = 0;
        this.loadingClients = false;
      }
    });

    this.appointmentService.getAllPaginated(0, 1).subscribe({
      next: (res: AppointmentPage<AppointmentMin>) => {
        this.totalAppointments = res.totalElements || 0;
        this.loadingAppointments = false;
      },
      error: () => {
        this.totalAppointments = 0;
        this.loadingAppointments = false;
      }
    });
  }

  loadChartsData(): void {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    this.clientsChartData.labels = meses;
    this.appointmentsChartData.labels = meses;

    // Dados de exemplo (substituir por dados reais via API)
    this.clientsChartData.datasets[0].data = [5, 10, 8, 15, 12, 20, 18, 25, 22, 28, 30, 35];
    this.appointmentsChartData.datasets[0].data = [7, 9, 12, 14, 20, 18, 24, 28, 25, 30, 33, 40];
  }
}
