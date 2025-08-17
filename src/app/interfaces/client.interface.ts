import { EmergencyContact } from "../services/emergency-contact.service";

export interface Client {
  id: number;
  name: string;
  cpf: string;
  birthDate: string; 
  email: string;
  phoneNumber: string;
  appointmentPrice: number;
  appointmentFrequency: string;
  treatmentStartDate: string; 
  treatmentEndDate?: string; 
  appointmentDurationInMinutes: number;
   emergencyContacts?: EmergencyContact[];
}
