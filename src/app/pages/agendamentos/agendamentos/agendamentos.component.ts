import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';
import { CompromissosComponent } from '../compromissos/compromissos.component';
import { Agendamento } from '../../../interfaces/agendamento.interface';
import { AgendamentoService } from '../../../services/agendamento.service';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, CalendarioComponent, CompromissosComponent],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent {
  compromissos: Agendamento[] = [];
  modoAtual: 'semana' | 'mes' = 'semana';
  dataAtual: Date = new Date();

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.agendamentoService.listar().subscribe((res) => {
      this.compromissos = res;
    });
  }

  atualizarFiltro(filtro: { modo: string; data: Date }) {
    this.modoAtual = filtro.modo as 'semana' | 'mes';
    this.dataAtual = filtro.data;
  }
}
