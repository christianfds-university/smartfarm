import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalhaoListComponent } from './talhao-list.component';

describe('TalhaoListComponent', () => {
  let component: TalhaoListComponent;
  let fixture: ComponentFixture<TalhaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalhaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalhaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
