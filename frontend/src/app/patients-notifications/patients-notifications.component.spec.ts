import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsNotificationsComponent } from './patients-notifications.component';

describe('PatientsNotificationsComponent', () => {
  let component: PatientsNotificationsComponent;
  let fixture: ComponentFixture<PatientsNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
