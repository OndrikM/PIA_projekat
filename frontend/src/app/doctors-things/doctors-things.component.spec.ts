import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsThingsComponent } from './doctors-things.component';

describe('DoctorsThingsComponent', () => {
  let component: DoctorsThingsComponent;
  let fixture: ComponentFixture<DoctorsThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsThingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
