import { TestBed } from '@angular/core/testing';
import { RegisterDoctorComponent } from './register-doctor.component';
describe('RegisterDoctorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterDoctorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegisterDoctorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=register-doctor.component.spec.js.map