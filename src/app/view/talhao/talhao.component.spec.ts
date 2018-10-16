import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalhaoComponent } from './talhao.component';

describe('TalhaoComponent', () => {
  let component: TalhaoComponent;
  let fixture: ComponentFixture<TalhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
