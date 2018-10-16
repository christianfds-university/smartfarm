import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalhaoRegComponent } from './talhao-reg.component';

describe('TalhaoRegComponent', () => {
  let component: TalhaoRegComponent;
  let fixture: ComponentFixture<TalhaoRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalhaoRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalhaoRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
