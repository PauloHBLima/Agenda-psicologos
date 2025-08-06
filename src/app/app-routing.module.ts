import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
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
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/lista-clientes/lista-clientes.component')
        .then(m => m.ClientListComponent)
  },
  {
    path: 'clientes/novo',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent)
  },
  {
    path: 'clientes/:id',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
