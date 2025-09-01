import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Client, ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

export interface EmergencyContact {
  id?: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  relationship: string;
  clientId?: number | null; 
}

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
})
export class FormularioClienteComponent implements OnInit {
  form!: FormGroup<{
    name: FormControl<string>;
    cpf: FormControl<string>;
    birthDate: FormControl<string>;
    email: FormControl<string>;
    phoneNumber: FormControl<string>;
    appointmentPrice: FormControl<number | null>;
    appointmentFrequency: FormControl<number | null>;
    treatmentStartDate: FormControl<string>;
    treatmentEndDate: FormControl<string>;
    appointmentDurationInMinutes: FormControl<number | null>;
    contacts: FormArray<FormGroup<{
      name: FormControl<string>;
      email: FormControl<string>;
      phoneNumber: FormControl<string>;
      relationship: FormControl<string>;
      clientId: FormControl<number | null>;
    }>>;
  }>;

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
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.fb.nonNullable.control('', [Validators.pattern(/^\d{11}$/)]),
      birthDate: this.fb.nonNullable.control(''),
      email: this.fb.nonNullable.control('', [Validators.email]),
      phoneNumber: this.fb.nonNullable.control('', [Validators.pattern(/^\d{10,11}$/)]),
      appointmentPrice: this.fb.control<number | null>(0, [Validators.min(0)]),
      appointmentFrequency: this.fb.control<number | null>(1, [Validators.min(1)]),
      treatmentStartDate: this.fb.nonNullable.control(''),
      treatmentEndDate: this.fb.nonNullable.control(''),
      appointmentDurationInMinutes: this.fb.control<number | null>(50, [Validators.min(10)]),
      contacts: this.fb.array<FormGroup<{ 
        name: FormControl<string>; 
        email: FormControl<string>; 
        phoneNumber: FormControl<string>; 
        relationship: FormControl<string>; 
        clientId: FormControl<number | null>;
      }>>([])
    });
  }

  get contacts(): FormArray<FormGroup<{ 
    name: FormControl<string>; 
    email: FormControl<string>; 
    phoneNumber: FormControl<string>; 
    relationship: FormControl<string>; 
    clientId: FormControl<number | null>;
  }>> {
    return this.form.get('contacts') as FormArray<FormGroup<{
      name: FormControl<string>; 
      email: FormControl<string>; 
      phoneNumber: FormControl<string>; 
      relationship: FormControl<string>; 
      clientId: FormControl<number | null>;
    }>>;
  }

  addContact(contact?: Partial<EmergencyContact>) { 
    const group = this.fb.group({
      name: this.fb.nonNullable.control(contact?.name || '', [Validators.required, Validators.minLength(3)]),
      email: this.fb.nonNullable.control(contact?.email || '', [Validators.email]),
      phoneNumber: this.fb.nonNullable.control(contact?.phoneNumber || '', [Validators.pattern(/^\d{10,11}$/)]),
      relationship: this.fb.nonNullable.control(contact?.relationship || '', [Validators.required]),
      clientId: this.fb.control(contact?.clientId ?? null)
    });
    this.contacts.push(group);
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  loadClient() {
    this.loading = true;
    this.service.getClient(this.clientId!).subscribe({
      next: (client) => {
        const clientData = {
          ...client,
          appointmentPrice: client.appointmentPrice ?? 0,
          appointmentFrequency: client.appointmentFrequency ?? 1,
          appointmentDurationInMinutes: client.appointmentDurationInMinutes ?? 50
        };

        this.form.patchValue(clientData);

        if ((client as any).contacts) {
          (client as any).contacts.forEach((ec: EmergencyContact) => this.addContact(ec));
        }

        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const rawData = this.form.getRawValue();

    const data: Client & { contacts?: EmergencyContact[] } = {
      ...rawData,
      contacts: rawData.contacts ?? [],
      appointmentPrice: rawData.appointmentPrice ?? 0,
      appointmentFrequency: rawData.appointmentFrequency ?? 1,
      appointmentDurationInMinutes: rawData.appointmentDurationInMinutes ?? 50,
    };

    const request = this.clientId
      ? this.service.updateClient(this.clientId, data)
      : this.service.createClient(data);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/clientes']);
      },
      error: () => (this.saving = false),
    });
  }

  get f() {
    return this.form.controls;
  }
}
