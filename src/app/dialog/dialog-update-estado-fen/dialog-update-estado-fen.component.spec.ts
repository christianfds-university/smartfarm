import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateEstadoFenComponent } from './dialog-update-estado-fen.component';

describe('DialogUpdateEstadoFenComponent', () => {
  let component: DialogUpdateEstadoFenComponent;
  let fixture: ComponentFixture<DialogUpdateEstadoFenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateEstadoFenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateEstadoFenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
