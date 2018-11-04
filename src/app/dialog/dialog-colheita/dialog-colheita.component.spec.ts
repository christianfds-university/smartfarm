import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColheitaComponent } from './dialog-colheita.component';

describe('DialogColheitaComponent', () => {
  let component: DialogColheitaComponent;
  let fixture: ComponentFixture<DialogColheitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogColheitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogColheitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
