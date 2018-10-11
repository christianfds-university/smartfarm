import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropRuralRegisterComponent } from './prop-rural-register.component';

describe('PropRuralRegisterComponent', () => {
  let component: PropRuralRegisterComponent;
  let fixture: ComponentFixture<PropRuralRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropRuralRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropRuralRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
