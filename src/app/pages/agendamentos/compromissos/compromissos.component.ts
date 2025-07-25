import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Agendamento } from '../../../interfaces/agendamento.interface';

@Component({
  selector: 'app-compromissos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './compromissos.component.html',
  styleUrls: ['./compromissos.component.scss']
})
export class CompromissosComponent implements OnChanges {
  @Input() modo: 'semana' | 'mes' = 'semana';
  @Input() data: Date = new Date();
  @Input() compromissos: Agendamento[] = [];

  listaFiltrada: Agendamento[] = [];

  ngOnChanges(): void {
    this.filtrar();
  }

  filtrar() {
    const base = new Date(this.data);
    const inicio = new Date(base);
    const fim = new Date(base);

    if (this.modo === 'semana') {
      inicio.setDate(base.getDate() - base.getDay());
      fim.setDate(inicio.getDate() + 6);
    } else {
      inicio.setDate(1);
      fim.setMonth(base.getMonth() + 1);
      fim.setDate(0);
    }

    this.listaFiltrada = this.compromissos.filter((c) => {
      const dataC = new Date(c.data);
      return dataC >= inicio && dataC <= fim;
    });
  }
}
