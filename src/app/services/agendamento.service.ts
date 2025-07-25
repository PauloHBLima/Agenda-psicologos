import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../interfaces/agendamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor() {}

  listar(): Observable<Agendamento[]> {
    const mockAgendamentos: Agendamento[] = [
      {
        id: 1,
        nomePaciente: 'Ana Souza',
        data: '2025-07-24',
        hora: '10:00',
        telefone: '(11) 98765-4321',
        observacoes: 'Primeira sessão de avaliação'
      },
      {
        id: 2,
        nomePaciente: 'Carlos Lima',
        data: '2025-07-25',
        hora: '14:30',
        telefone: '(11) 91234-5678'
      },
      {
        id: 3,
        nomePaciente: 'Fernanda Ribeiro',
        data: '2025-07-26',
        hora: '09:30',
        telefone: '(11) 99999-0000',
        observacoes: 'Retorno de acompanhamento'
      },
      {
        id: 4,
        nomePaciente: 'Mariana Torres',
        data: '2025-08-02',
        hora: '11:00',
        telefone: '(11) 98888-1234'
      }
    ];

    return of(mockAgendamentos);
  }
}
