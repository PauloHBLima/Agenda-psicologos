import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirAgendamentoComponent } from './excluir-agendamento.component';

describe('ExcluirAgendamentoComponent', () => {
  let component: ExcluirAgendamentoComponent;
  let fixture: ComponentFixture<ExcluirAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
