import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafraRegComponent } from './safra-reg.component';

describe('SafraRegComponent', () => {
  let component: SafraRegComponent;
  let fixture: ComponentFixture<SafraRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafraRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafraRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
