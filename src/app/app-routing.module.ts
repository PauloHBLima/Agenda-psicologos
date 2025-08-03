import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Client } from './services/client.service';


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
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/lista-clientes/lista-clientes.component')
        .then(m => m.ClientListComponent)
  },
  {
    path: 'clientes/formulario',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent)
  },
  {
    path: 'clientes/formulario/:id',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent)
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
