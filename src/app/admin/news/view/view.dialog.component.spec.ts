import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View.DialogComponent } from './view.dialog.component';

describe('View.DialogComponent', () => {
  let component: View.DialogComponent;
  let fixture: ComponentFixture<View.DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ View.DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(View.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
