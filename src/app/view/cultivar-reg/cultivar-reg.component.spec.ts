import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivarRegComponent } from './cultivar-reg.component';

describe('CultivarRegComponent', () => {
  let component: CultivarRegComponent;
  let fixture: ComponentFixture<CultivarRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultivarRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivarRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
