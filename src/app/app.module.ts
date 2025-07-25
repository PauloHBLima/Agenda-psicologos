import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes de Agendamentos
import { AgendamentosComponent } from './pages/agendamentos/agendamentos/agendamentos.component';
import { CalendarioComponent } from './pages/agendamentos/calendario/calendario.component';
import { CompromissosComponent } from './pages/agendamentos/compromissos/compromissos.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule,
    AgendamentosComponent,
    CalendarioComponent,
    CompromissosComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
