import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class FormularioClienteComponent implements OnInit {
  form!: FormGroup;
  clientId?: number;
  loading = false;
  saving = false;

  constructor(
    private service: ClientService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.buildForm();
    if (this.clientId) {
      this.loadClient();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cpf: [''],
      birthDate: [''],
      email: [''],
      phoneNumber: [''],
      appointmentPrice: [''],
      appointmentFrequency: [''],
      treatmentStartDate: [''],
      treatmentEndDate: [''],
      appointmentDurationInMinutes: [''],
    });
  }

  loadClient() {
    this.loading = true;
    this.service.getClient(this.clientId!).subscribe({
      next: (client) => {
        this.form.patchValue(client);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving = true;

    const data: Client = this.form.value;

    const obs = this.clientId
      ? this.service.updateClient(this.clientId, data)
      : this.service.createClient(data);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/clientes']);
      },
      error: () => (this.saving = false),
    });
  }
}
