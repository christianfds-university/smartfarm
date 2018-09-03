import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtongridComponent } from './buttongrid.component';

describe('ButtongridComponent', () => {
  let component: ButtongridComponent;
  let fixture: ComponentFixture<ButtongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
