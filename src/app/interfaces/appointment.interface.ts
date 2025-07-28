export interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  appointmentStatus: string;
  price: number;
  paid: boolean;
  clientId: number;
   clientName: string;
}

export interface AppointmentMinDTO {
  startTime: string;
  paid: boolean;
  clientId: number;
}
