import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-excluir-agendamento',
  templateUrl: './excluir-agendamento.component.html',
  styleUrls: ['./excluir-agendamento.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ExcluirAgendamentoComponent {
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<ExcluirAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: AppointmentService,
    private snack: MatSnackBar
  ) {}

  cancelar() {
    this.dialogRef.close(false); 
  }

  confirmar() {
    this.loading = true; 
    this.service.delete(this.data.id).subscribe({
      next: () => {
        this.snack.open('Agendamento excluído com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error('Erro ao excluir agendamento:', err);
        this.snack.open('Erro ao excluir agendamento.', 'Fechar', { duration: 3000 });
        this.loading = false; 
      }
    });
  }
}
