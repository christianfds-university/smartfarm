import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropRuralComponent } from './prop-rural.component';

describe('PropRuralComponent', () => {
  let component: PropRuralComponent;
  let fixture: ComponentFixture<PropRuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropRuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
