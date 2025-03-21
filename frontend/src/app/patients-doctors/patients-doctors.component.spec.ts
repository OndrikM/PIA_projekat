import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsDoctorsComponent } from './patients-doctors.component';

describe('PatientsDoctorsComponent', () => {
  let component: PatientsDoctorsComponent;
  let fixture: ComponentFixture<PatientsDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
