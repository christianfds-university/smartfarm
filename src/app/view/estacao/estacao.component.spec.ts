import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacaoComponent } from './estacao.component';

describe('EstacaoComponent', () => {
  let component: EstacaoComponent;
  let fixture: ComponentFixture<EstacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
