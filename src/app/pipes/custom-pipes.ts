import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarHorario',
  standalone: true,
})
export class FormatarHorarioPipe implements PipeTransform {
  transform(startTime: Date | string, endTime: Date | string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

 const formatTime = (date: Date) =>
      `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    const formatDate = (date: Date) =>
      `${days[date.getDay()]}, ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;

    return `${formatDate(start)} — ${formatTime(start)} até ${formatTime(end)}`;
  }
}

@Pipe({
  name: 'paymentStatus',
  standalone: true,
})
export class PaymentStatusPipe implements PipeTransform {
  transform(paid: boolean): { text: string; cssClass: string } {
    return paid
      ? { text: 'Pago', cssClass: 'payment-status-pago' }
      : { text: 'Pendente', cssClass: 'payment-status-pendente' };
  }
}

export const CUSTOM_PIPES = [
  FormatarHorarioPipe,
  PaymentStatusPipe
];
