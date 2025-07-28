export interface Agendamento {
  id: number;
  nomePaciente: string;
  data: string;    
  hora: string;       
  telefone: string;
  observacoes?: string; 
}
