import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agendamentos',
    pathMatch: 'full'
  },
  {
    path: 'agendamentos',
    loadComponent: () =>
      import('./pages/agendamentos/listar-agendamentos/listar-agendamentos.component')
        .then(m => m.ListarAgendamentosComponent)
  },
  {
    path: 'agendamentos/criar',
    loadComponent: () =>
      import('./pages/agendamentos/criar-agendamento/criar-agendamento.component')
        .then(m => m.CriarAgendamentoComponent)
  },
  {
    path: 'agendamentos/editar/:id',
    loadComponent: () =>
      import('./pages/agendamentos/editar-agendamento/editar-agendamento.component')
        .then(m => m.EditarAgendamentoComponent)
  },
  {
    path: '**',
    redirectTo: 'agendamentos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
