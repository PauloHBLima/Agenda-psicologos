export interface AppointmentUpdateDTO {
  id: number;
  startTime: string;         
  endTime: string;         
  appointmentStatus: string;
  price: number | null;
  paid: boolean;
  clientId: number;
}