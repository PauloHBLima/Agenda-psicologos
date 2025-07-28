import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from "@angular/material/card";

import { AppointmentMinDTO } from '../../../interfaces/appointment.interface';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  standalone: true,
  selector: 'app-novo-agendamento',
  templateUrl: './novo-agendamento.component.html',
  styleUrls: ['./novo-agendamento.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule
]
})
export class NovoAgendamentoComponent implements OnInit {
  form!: FormGroup;
  saving = false; 

  constructor(
    private fb: FormBuilder,
    private service: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      startTime: [null, Validators.required],
      paid: [false, Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true; 


    const dto: AppointmentMinDTO = {
      startTime: new Date(this.form.value.startTime).toISOString(),
      paid: this.form.value.paid,
      clientId: this.form.value.clientId
    };


    this.service.create(dto).subscribe({
      next: () => {
        alert('Agendamento criado com sucesso!');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Erro ao criar agendamento', err);
        alert('Erro ao criar agendamento.');
        this.saving = false;  
      },
      complete: () => {
        this.saving = false; 
      }
    });
  }

  cancelar(): void {
    if (!this.saving) {
      this.router.navigateByUrl('/');
    }
  }
}
