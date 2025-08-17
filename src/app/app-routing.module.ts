import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa o guard

const routes: Routes = [
  // Redireciona para login por padrão
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login/login.component').then(m => m.LoginComponent)
  },

  // Dashboard (protegida pelo guard)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },

  // Agendamentos (protegidas pelo guard)
  {
    path: 'agendamentos',
    loadComponent: () =>
      import('./pages/agendamentos/listar-agendamentos/listar-agendamentos.component')
        .then(m => m.ListarAgendamentosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'agendamentos/criar',
    loadComponent: () =>
      import('./pages/agendamentos/criar-agendamento/criar-agendamento.component')
        .then(m => m.CriarAgendamentoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'agendamentos/editar/:id',
    loadComponent: () =>
      import('./pages/agendamentos/editar-agendamento/editar-agendamento.component')
        .then(m => m.EditarAgendamentoComponent),
    canActivate: [AuthGuard]
  },

  // Clientes (protegidas pelo guard)
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/lista-clientes/lista-clientes.component')
        .then(m => m.ClientListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/novo',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/:id',
    loadComponent: () =>
      import('./pages/clientes/formulario-cliente/formulario-cliente.component')
        .then(m => m.FormularioClienteComponent),
    canActivate: [AuthGuard]
  },

  // Wildcard (qualquer rota desconhecida redireciona para login)
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
