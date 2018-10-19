import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivarListComponent } from './cultivar-list.component';

describe('CultivarListComponent', () => {
  let component: CultivarListComponent;
  let fixture: ComponentFixture<CultivarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultivarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
