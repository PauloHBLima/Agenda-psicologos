export interface Agendamento {
  id: number;
  nomePaciente: string;
  data: string;       // Ex: '2025-07-24'
  hora: string;       // Ex: '14:30'
  telefone: string;
  observacoes?: string;  // opcional
}
