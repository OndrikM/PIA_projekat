import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsChecksComponent } from './doctors-checks.component';

describe('DoctorsChecksComponent', () => {
  let component: DoctorsChecksComponent;
  let fixture: ComponentFixture<DoctorsChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
