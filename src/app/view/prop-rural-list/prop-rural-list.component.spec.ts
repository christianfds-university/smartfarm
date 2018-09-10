import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropRuralListComponent } from './prop-rural-list.component';

describe('PropRuralListComponent', () => {
  let component: PropRuralListComponent;
  let fixture: ComponentFixture<PropRuralListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropRuralListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropRuralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
