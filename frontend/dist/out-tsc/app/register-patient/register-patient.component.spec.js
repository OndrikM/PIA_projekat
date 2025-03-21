import { TestBed } from '@angular/core/testing';
import { RegisterPatientComponent } from './register-patient.component';
describe('RegisterPatientComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterPatientComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegisterPatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=register-patient.component.spec.js.map