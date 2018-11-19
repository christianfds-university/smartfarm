import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProdutividadeComponent } from './dialog-produtividade.component';

describe('DialogProdutividadeComponent', () => {
  let component: DialogProdutividadeComponent;
  let fixture: ComponentFixture<DialogProdutividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProdutividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProdutividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
