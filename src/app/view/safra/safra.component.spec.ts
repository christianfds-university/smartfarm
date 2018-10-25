import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafraComponent } from './safra.component';

describe('SafraComponent', () => {
  let component: SafraComponent;
  let fixture: ComponentFixture<SafraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
