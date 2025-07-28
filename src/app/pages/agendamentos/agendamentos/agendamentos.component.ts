import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../interfaces/appointment.interface';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AgendamentosComponent implements OnInit {
  appointments: Appointment[] = [];            
  appointmentsFiltrados: Appointment[] = [];    

  dataBase = new Date();                        
  modo: 'semana' | 'mes' = 'semana';             
  buscaNome: string = '';                       

  constructor(private service: AppointmentService) {}

  ngOnInit(): void {
    this.filtrar(); 
  }

  filtrar(): void {
    const inicio = new Date(this.dataBase);
    const fim = new Date(this.dataBase);

    if (this.modo === 'semana') {
      fim.setDate(inicio.getDate() + 6);
    } else {
      fim.setMonth(inicio.getMonth() + 1);
      fim.setDate(inicio.getDate() - 1);
    }

    const firstDate = inicio.toISOString();
    const lastDate = fim.toISOString();

    this.service.getByDate(firstDate, lastDate).subscribe({
      next: (res) => {
        this.appointments = res.content;
        this.aplicarFiltro(); 
      },
      error: (err) => console.error(err)
    });
  }

  aplicarFiltro(): void {
    const termo = this.buscaNome.trim().toLowerCase();

    if (!termo) {
      this.appointmentsFiltrados = this.appointments;
      return;
    }

    this.appointmentsFiltrados = this.appointments.filter(ag =>
      ag.clientName?.toLowerCase().includes(termo)
    );
  }
}
