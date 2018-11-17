import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstacaoComponent } from './dialog-estacao.component';

describe('DialogEstacaoComponent', () => {
  let component: DialogEstacaoComponent;
  let fixture: ComponentFixture<DialogEstacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEstacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEstacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
