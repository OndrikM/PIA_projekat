import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsChecksComponent } from './patients-checks.component';

describe('PatientsChecksComponent', () => {
  let component: PatientsChecksComponent;
  let fixture: ComponentFixture<PatientsChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
