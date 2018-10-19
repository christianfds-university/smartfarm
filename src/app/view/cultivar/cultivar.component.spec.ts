import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivarComponent } from './cultivar.component';

describe('CultivarComponent', () => {
  let component: CultivarComponent;
  let fixture: ComponentFixture<CultivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
