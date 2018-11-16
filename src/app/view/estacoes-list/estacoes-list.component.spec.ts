import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacoesListComponent } from './estacoes-list.component';

describe('EstacoesListComponent', () => {
  let component: EstacoesListComponent;
  let fixture: ComponentFixture<EstacoesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacoesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
