import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOfficeComponent } from './manager-office.component';

describe('ManagerOfficeComponent', () => {
  let component: ManagerOfficeComponent;
  let fixture: ComponentFixture<ManagerOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
